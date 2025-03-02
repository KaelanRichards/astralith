import { apiRpc, getApiClient, InferRequestType } from "./client";

const $createTeam = apiRpc.teams.$post;

export async function getUserTeams() {
  try {
    console.log("Fetching user teams...");
    const client = await getApiClient();
    
    const response = await client.teams.$get();
    const data = await response.json();
    console.log("User teams fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user teams:", error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}

export async function getTeam(teamId: string) {
  try {
    console.log(`Fetching team with ID: ${teamId}`);
    const client = await getApiClient();

    const response = await client.teams[":teamId"].$get({
      param: { teamId },
    });
    const data = await response.json();
    console.log(`Team ${teamId} fetched successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching team ${teamId}:`, error);
    // Return null instead of throwing to prevent UI errors
    return null;
  }
}

export async function getTeamMembers(teamId: string) {
  try {
    console.log(`Fetching members for team with ID: ${teamId}`);
    const client = await getApiClient();

    const response = await client.teams[":teamId"].members.$get({
      param: { teamId },
    });
    const data = await response.json();
    console.log(`Team ${teamId} members fetched successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching members for team ${teamId}:`, error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}

export type CreateTeamParams = InferRequestType<typeof $createTeam>["json"];
export async function createTeam(params: CreateTeamParams) {
  try {
    console.log("Creating new team with params:", params);
    const client = await getApiClient();

    const response = await client.teams.$post({ json: params });
    const data = await response.json();
    console.log("Team created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
}

export type AddTeamMemberParams = {
  userId: string;
  role: "admin" | "member";
};

export async function addTeamMember(teamId: string, params: AddTeamMemberParams) {
  try {
    console.log(`Adding member to team ${teamId} with params:`, params);
    const client = await getApiClient();

    const response = await client.teams[":teamId"].members.$post({
      param: { teamId },
      json: params,
    });
    const data = await response.json();
    console.log(`Member added to team ${teamId} successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error adding member to team ${teamId}:`, error);
    throw error;
  }
}

// Function to transform team member data for UI display
export function transformTeamMemberData(teamMembers: any[]) {
  if (!teamMembers || !Array.isArray(teamMembers)) {
    console.warn("transformTeamMemberData received invalid data:", teamMembers);
    return [];
  }
  
  console.log(`Transforming ${teamMembers.length} team members for UI display`);
  
  return teamMembers.map(member => {
    // Get first name and last name from member's name or user's name
    const name = member.user?.name || member.name || "Unknown User";
    const email = member.user?.email || member.email || "unknown@example.com";
    
    return {
      id: member.id || `temp_${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      email: email,
      role: member.role ? member.role.charAt(0).toUpperCase() + member.role.slice(1) : "Member", // Capitalize role
      department: member.department || "Not specified",
      avatarUrl: `https://api.dicebear.com/7.x/lorelei/svg?seed=${name.replace(/\s+/g, '')}`,
      status: member.status || "active",
      joinedAt: member.createdAt || new Date().toISOString(),
    };
  });
} 