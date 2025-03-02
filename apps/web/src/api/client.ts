import { hc } from "hono/client";
import { HTTPException } from "hono/http-exception";
import type { AppType } from "../../../api/src";
import { getToken } from "@/lib/clerk";

export type { InferRequestType, InferResponseType } from "hono/client";

const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL!;
  console.log(`API base URL from env: ${url}`);
  console.log(`All environment variables:`, process.env);
  if (!url) {
    console.error('NEXT_PUBLIC_API_URL is not defined in environment variables!');
    // Fallback to a default URL for development
    return 'http://localhost:3004';
  }
  return url;
};

export const apiRpc = hc<AppType>(getBaseUrl(), {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    console.log(`API call (direct): ${input.toString()}`);
    try {
      const response = await fetch(input, init);
      
      if (!response.ok) {
        console.error(`API call failed (direct): ${input.toString()}`, { 
          status: response.status, 
          statusText: response.statusText 
        });
      }
      
      return response;
    } catch (error) {
      console.error(`API call error (direct): ${input.toString()}`, error);
      throw error;
    }
  },
}).api;

export const getApiClient = () => {
  return hc<AppType>(getBaseUrl(), {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      console.log(`API call (authenticated): ${input.toString()}`);
      
      try {
        const headers = new Headers(init?.headers);
        const authToken = await getToken();

        if (!authToken) {
          console.warn(`No auth token available for request to: ${input.toString()}`);
          // When in development and no token, redirect to sign-in
          if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            console.log("Redirecting to sign-in page due to missing auth token");
            window.location.href = '/sign-in';
            // Return a fake response to prevent further execution
            return new Response(JSON.stringify({ error: "Authentication required" }), {
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else {
          console.log("Auth token available, adding to request");
          headers.set("Authorization", `Bearer ${authToken}`);
        }

        // Only set Authorization header if we actually have a token
        // If no token, still make the request, the API will return 401 
        // which we'll handle appropriately

        const response = await fetch(input, {
          ...init,
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          console.error(`API call failed: ${input.toString()}`, { 
            status: response.status, 
            statusText: response.statusText,
            url: response.url
          });
          
          // Try to get more error details
          try {
            const errorText = await response.text();
            console.error("Error response body:", errorText);
          } catch (e) {
            console.error("Could not read error response body");
          }
          
          throw new HTTPException(response.status as any, {
            message: `Network response was not ok: ${response.status} ${response.statusText}`,
          });
        }

        return response;
      } catch (error) {
        console.error(`API call error: ${input.toString()}`, error);
        throw error;
      }
    },
  }).api;
};

export const getServerClient = () => {
  return hc<AppType>(getBaseUrl(), {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      console.log(`API call (server): ${input.toString()}`);
      
      try {
        const headers = new Headers(init?.headers);
        const response = await fetch(input, {
          ...init,
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          console.error(`API call failed (server): ${input.toString()}`, { 
            status: response.status, 
            statusText: response.statusText 
          });
          
          // Try to get more error details
          try {
            const errorText = await response.text();
            console.error("Error response body:", errorText);
          } catch (e) {
            console.error("Could not read error response body");
          }
          
          throw new HTTPException(response.status as any, {
            message: `Network response was not ok: ${response.status} ${response.statusText}`,
          });
        }

        return response;
      } catch (error) {
        console.error(`API call error (server): ${input.toString()}`, error);
        throw error;
      }
    },
  }).api;
};
