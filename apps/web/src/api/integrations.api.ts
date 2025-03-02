import { apiRpc, getApiClient, InferRequestType } from "./client";

export async function getTeamIntegrations(teamId: string) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"].$get({
    param: { teamId },
  });
  return response.json();
}

export async function getIntegration(teamId: string, integrationId: string) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"][":integrationId"].$get({
    param: { teamId, integrationId },
  });
  return response.json();
}

export async function deleteIntegration(teamId: string, integrationId: string) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"][":integrationId"].$delete({
    param: { teamId, integrationId },
  });
  return response.json();
}

interface SlackConfig {
  token: string;
  workspace: string;
}

export async function configureSlackIntegration(teamId: string, config: SlackConfig) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"].slack.$post({
    param: { teamId },
    json: config,
  });
  return response.json();
}

interface LinearConfig {
  apiKey: string;
  teamId?: string;
}

export async function configureLinearIntegration(teamId: string, config: LinearConfig) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"].linear.$post({
    param: { teamId },
    json: config,
  });
  return response.json();
}

interface GithubConfig {
  token: string;
  organization?: string;
  repositories?: string[];
}

export async function configureGithubIntegration(teamId: string, config: GithubConfig) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"].github.$post({
    param: { teamId },
    json: config,
  });
  return response.json();
}

interface CalendarConfig {
  provider: "google" | "outlook";
  token: string;
}

export async function configureCalendarIntegration(teamId: string, config: CalendarConfig) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"].calendar.$post({
    param: { teamId },
    json: config,
  });
  return response.json();
}

interface HrConfig {
  provider: "gusto" | "bamboohr" | "other";
  apiKey: string;
  domain?: string;
}

export async function configureHrIntegration(teamId: string, config: HrConfig) {
  const client = await getApiClient();

  const response = await client.integrations[":teamId"].hr.$post({
    param: { teamId },
    json: config,
  });
  return response.json();
} 