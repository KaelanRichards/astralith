// From: https://github.com/honojs/middleware/blob/main/packages/clerk-auth/src/index.ts
import { createClerkClient } from "@clerk/backend";
import type { ClerkClient, ClerkOptions } from "@clerk/backend";
import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { logger } from "@repo/logs";

type ClerkAuth = ReturnType<Awaited<ReturnType<ClerkClient["authenticateRequest"]>>["toAuth"]>;

declare module "hono" {
  interface ContextVariableMap {
    clerk: ClerkClient;
    clerkAuth: ClerkAuth;
  }
}

export const getAuth = (c: Context) => {
  const clerkAuth = c.get("clerkAuth");

  return clerkAuth;
};

export const getUserId = (c: Context) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    throw new Error("Unauthorized");
  }
  return auth.userId;
};

type ClerkEnv = {
  CLERK_SECRET_KEY: string;
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  CLERK_API_URL: string;
  CLERK_API_VERSION: string;
};

export const auth = (options?: ClerkOptions): MiddlewareHandler => {
  return async (c, next) => {
    try {
      const clerkEnv = env<ClerkEnv>(c);
      const { secretKey, publishableKey, apiUrl, apiVersion, ...rest } = options || {
        secretKey: clerkEnv.CLERK_SECRET_KEY || "",
        publishableKey: clerkEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
        apiUrl: clerkEnv.CLERK_API_URL,
        apiVersion: clerkEnv.CLERK_API_VERSION,
      };
      
      logger.info("Clerk auth middleware: starting authentication", { 
        hasSecretKey: !!secretKey,
        hasPublishableKey: !!publishableKey
      });
      
      if (!secretKey) {
        logger.error("Missing Clerk Secret key");
        throw new Error("Missing Clerk Secret key");
      }

      if (!publishableKey) {
        logger.error("Missing Clerk Publishable key");
        throw new Error("Missing Clerk Publishable key");
      }

      const clerkClient = createClerkClient({
        ...rest,
        apiUrl,
        apiVersion,
        secretKey,
        publishableKey,
      });

      // Log auth headers for debugging
      const authHeader = c.req.header("Authorization");
      logger.info("Auth header present", { 
        hasAuthHeader: !!authHeader,
        authHeaderPrefix: authHeader ? authHeader.substring(0, 15) + "..." : "none"
      });

      // Check if the Authorization header has the correct format
      if (authHeader) {
        if (!authHeader.startsWith("Bearer ")) {
          logger.error("Invalid Authorization header format", { 
            format: "Does not start with 'Bearer '"
          });
          return c.json({ error: "Invalid Authorization header format" }, 401);
        }
        
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        
        if (token === "missing" || token === "null" || token === "undefined") {
          logger.error("Invalid token value", { token });
          return c.json({ error: "Invalid token value" }, 401);
        }
        
        if (token.length < 10) {
          logger.error("Token appears too short", { tokenLength: token.length });
          return c.json({ error: "Token appears invalid" }, 401);
        }
        
        logger.info("Token format appears valid", { tokenLength: token.length });
      }

      try {
        const requestState = await clerkClient.authenticateRequest(c.req.raw, {
          ...rest,
          secretKey,
          publishableKey,
        });

        if (requestState.headers) {
          requestState.headers.forEach((value, key) => c.res.headers.append(key, value));

          const locationHeader = requestState.headers.get("location");

          if (locationHeader) {
            return c.redirect(locationHeader, 307);
          } else if (requestState.status === "handshake") {
            throw new Error("Clerk: unexpected handshake without redirect");
          }
        }

        const auth = requestState.toAuth();
        logger.info("Clerk auth successful", { 
          status: requestState.status,
          hasUserId: !!auth?.userId,
          userId: auth?.userId || "none"
        });
        
        c.set("clerkAuth", auth);
        c.set("clerk", clerkClient);
      } catch (error) {
        logger.error("Clerk authentication error", { error });
        // Continue to next middleware but with no auth
        // This allows requireAuth to handle the 401 response
        c.set("clerkAuth", null as unknown as ClerkAuth);
        c.set("clerk", clerkClient);
      }
      
      await next();
    } catch (error) {
      logger.error("Clerk auth middleware error", { error });
      return c.json({ error: "Authentication error", details: (error as Error).message }, 500);
    }
  };
};

export const requireAuth: MiddlewareHandler = async (c, next) => {
  try {
    const auth = getAuth(c);
    if (!auth?.userId) {
      logger.warn("Unauthorized request - no userId in auth");
      return c.text("Unauthorized", 401);
    }
    logger.info("User authenticated", { userId: auth.userId });
    await next();
  } catch (error) {
    logger.error("Auth requirement check failed", { error });
    return c.text("Unauthorized", 401);
  }
};
