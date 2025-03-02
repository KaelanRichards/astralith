import { apiRpc, getApiClient, InferRequestType } from "./client";

export async function getTeamMetrics(teamId: string) {
  // This is a direct fetch since we're not sure about the client structure
  const response = await fetch(`/api/teams/${teamId}/metrics`);
  return response.json();
}

export async function getTeamDigests(teamId: string, limit?: number) {
  // This is a direct fetch since we're not sure about the client structure
  const url = `/api/pulse/teams/${teamId}/digests${limit ? `?limit=${limit}` : ''}`;
  const response = await fetch(url);
  return response.json();
}

export async function getDigest(digestId: string) {
  // This is a direct fetch since we're not sure about the client structure
  const response = await fetch(`/api/pulse/digests/${digestId}`);
  return response.json();
}

export async function getLatestDigest(teamId: string, type: "daily" | "weekly") {
  // This is a direct fetch since we're not sure about the client structure
  const response = await fetch(`/api/pulse/teams/${teamId}/digests/latest?type=${type}`);
  return response.json();
}

export async function generateDailyDigest(teamId: string) {
  // This is a direct fetch since we're not sure about the client structure
  const response = await fetch(`/api/pulse/teams/${teamId}/digests/daily`, {
    method: 'POST',
  });
  return response.json();
}

export async function generateWeeklyDigest(teamId: string) {
  // This is a direct fetch since we're not sure about the client structure
  const response = await fetch(`/api/pulse/teams/${teamId}/digests/weekly`, {
    method: 'POST',
  });
  return response.json();
} 