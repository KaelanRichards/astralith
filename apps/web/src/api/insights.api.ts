import { apiRpc, getApiClient, InferRequestType } from "./client";

export async function getTeamInsights(teamId: string) {
  const client = await getApiClient();

  const response = await client.insights[":teamId"].$get({
    param: { teamId }
  });
  return response.json();
}

export async function getInsight(teamId: string, insightId: string) {
  const client = await getApiClient();

  const response = await client.insights[":teamId"][":insightId"].$get({
    param: { teamId, insightId }
  });
  return response.json();
}

export async function updateInsightStatus(teamId: string, insightId: string, status: "active" | "acknowledged" | "resolved" | "dismissed") {
  const client = await getApiClient();

  const response = await client.insights[":teamId"][":insightId"].status.$patch({
    param: { teamId, insightId },
    json: { status }
  });
  return response.json();
}

export async function generateAllInsights(teamId: string) {
  const client = await getApiClient();

  const response = await client.insights[":teamId"].generate.$post({
    param: { teamId }
  });
  return response.json();
}

export async function generateInsightsFromSource(teamId: string, source: "slack" | "linear" | "github" | "calendar" | "hr") {
  const client = await getApiClient();

  // Use a different approach based on the source
  if (source === "slack") {
    const response = await client.insights[":teamId"].generate.slack.$post({
      param: { teamId }
    });
    return response.json();
  } else if (source === "linear") {
    const response = await client.insights[":teamId"].generate.linear.$post({
      param: { teamId }
    });
    return response.json();
  } else if (source === "github") {
    const response = await client.insights[":teamId"].generate.github.$post({
      param: { teamId }
    });
    return response.json();
  } else if (source === "calendar") {
    const response = await client.insights[":teamId"].generate.calendar.$post({
      param: { teamId }
    });
    return response.json();
  } else if (source === "hr") {
    const response = await client.insights[":teamId"].generate.hr.$post({
      param: { teamId }
    });
    return response.json();
  }
  
  throw new Error(`Unsupported source: ${source}`);
} 