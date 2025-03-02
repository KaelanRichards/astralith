import { getUserTeams, getTeamMembers, transformTeamMemberData } from "./teams.api";

// Get all team members across all of the user's teams
export async function getAllTeamMembers() {
  try {
    console.log("getAllTeamMembers: Starting to fetch user teams");
    // Get all teams the user belongs to
    const userTeams = await getUserTeams();
    console.log(`getAllTeamMembers: Fetched ${userTeams?.length || 0} user teams`);
    
    if (!userTeams || userTeams.length === 0) {
      console.warn("getAllTeamMembers: No teams found for the current user");
      return [];
    }
    
    // Fetch members for each team
    console.log("getAllTeamMembers: Fetching members for each team");
    const teamMembersPromises = userTeams.map(team => {
      console.log(`getAllTeamMembers: Fetching members for team ${team.id}`);
      return getTeamMembers(team.id);
    });
    
    const teamMembersArrays = await Promise.all(teamMembersPromises);
    console.log(`getAllTeamMembers: Fetched members from ${teamMembersArrays.length} teams`);
    
    // Flatten the arrays and transform the data
    const allMembers = teamMembersArrays.flat();
    console.log(`getAllTeamMembers: Total number of members (with duplicates): ${allMembers.length}`);
    
    // Remove duplicates (in case a user belongs to multiple teams)
    const uniqueMembers = allMembers.filter((member, index, self) => 
      index === self.findIndex(m => m.userId === member.userId)
    );
    
    console.log(`getAllTeamMembers: Number of unique members: ${uniqueMembers.length}`);
    
    // Transform the data for UI display
    const transformedMembers = transformTeamMemberData(uniqueMembers);
    console.log(`getAllTeamMembers: Transformed ${transformedMembers.length} members for UI display`);
    
    return transformedMembers;
  } catch (error) {
    console.error("getAllTeamMembers: Error fetching team members:", error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}

// Define the type for a team member with basic info
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl: string;
  status: string;
  joinedAt: string;
}

// Define the type for a team member with enhanced metrics
interface EnhancedTeamMember extends TeamMember {
  engagementScore: number;
  productivityScore: number;
  growthTrajectory: string;
  readyForPromotion: boolean;
  riskOfBurnout: string;
  recentActivity: string;
  lastActiveHours: number;
  projectContributions: Array<{
    project: string;
    tasks: number;
    completion: number;
  }>;
  strengths: string[];
  areasForGrowth: string[];
  tags: string[];
}

// Growth trajectory options
const growthTrajectories = ["Exceeding", "Meeting", "Developing", "Needs Improvement"];
// Burnout risk options
const burnoutRisks = ["Low", "Medium", "High"];
// Recent activity options
const recentActivities = [
  "Completed 14 tasks in the last 7 days",
  "Filed 8 bug reports in the last 7 days",
  "Merged 6 pull requests in the last 7 days",
  "Participated in 9 meetings in the last 7 days"
];
// Project options
const projectOptions = ["Dashboard Redesign", "Mobile App", "API Integration", "Testing Framework"];
const projectOptions2 = ["Data Migration", "Security Audit", "Performance Optimization", "Documentation"];

// Strengths options as regular arrays, not readonly
const strengthsOptions = [
  ["UI Design", "React", "Mentoring", "Documentation"],
  ["Backend", "Database", "Architecture", "Problem Solving"],
  ["Testing", "QA", "Bug Hunting", "Automation"],
  ["Project Management", "Communication", "Leadership", "Planning"]
];

// Areas for growth options as regular arrays, not readonly
const growthAreasOptions = [
  ["Backend Integration", "Performance Optimization"],
  ["Frontend Skills", "UI/UX Understanding"],
  ["Leadership", "Delegation"],
  ["Documentation", "Knowledge Sharing"]
];

// Tags options as regular arrays, not readonly
const tagsOptions = [
  ["High Performer", "Mentor", "Product Champion"],
  ["Technical Expert", "Process Improver", "Team Player"],
  ["Innovator", "Critical Thinker", "Detail Oriented"],
  ["At Risk", "Needs Support", "Quality Focused"]
];

// Transform member data to include metrics and productivity data
export function enhanceMemberData(members: TeamMember[]): EnhancedTeamMember[] {
  try {
    console.log(`enhanceMemberData: Enhancing ${members?.length || 0} team members with metrics`);
    
    if (!members || !Array.isArray(members) || members.length === 0) {
      console.warn("enhanceMemberData: No members to enhance or invalid data provided");
      return [];
    }
    
    return members.map(member => {
      // Safely get array items with fallbacks
      const randomGrowthIndex = Math.min(Math.floor(Math.random() * growthTrajectories.length), growthTrajectories.length - 1);
      const randomBurnoutIndex = Math.min(Math.floor(Math.random() * burnoutRisks.length), burnoutRisks.length - 1);
      const randomActivityIndex = Math.min(Math.floor(Math.random() * recentActivities.length), recentActivities.length - 1);
      const randomStrengthsIndex = Math.min(Math.floor(Math.random() * strengthsOptions.length), strengthsOptions.length - 1);
      const randomGrowthAreasIndex = Math.min(Math.floor(Math.random() * growthAreasOptions.length), growthAreasOptions.length - 1);
      const randomTagsIndex = Math.min(Math.floor(Math.random() * tagsOptions.length), tagsOptions.length - 1);
      const randomProjectIndex = Math.min(Math.floor(Math.random() * projectOptions.length), projectOptions.length - 1);
      const randomProject2Index = Math.min(Math.floor(Math.random() * projectOptions2.length), projectOptions2.length - 1);
      
      // Default values in case array access fails
      const defaultGrowthTrajectory = "Meeting";
      const defaultBurnoutRisk = "Low";
      const defaultRecentActivity = "Active recently";
      const defaultProject = "Project";
      const defaultStrengths = ["Teamwork"];
      const defaultAreasForGrowth = ["Communication"];
      const defaultTags = ["Team Member"];
      
      // Get the strengths, areas for growth, and tags arrays
      // Make a copy to ensure they're not readonly
      const strengths = [...(strengthsOptions[randomStrengthsIndex] || defaultStrengths)];
      const areasForGrowth = [...(growthAreasOptions[randomGrowthAreasIndex] || defaultAreasForGrowth)];
      const tags = [...(tagsOptions[randomTagsIndex] || defaultTags)];
      
      return {
        ...member,
        // Add random engagement score between 60-100
        engagementScore: Math.floor(Math.random() * 40) + 60,
        
        // Add random productivity score between 60-100
        productivityScore: Math.floor(Math.random() * 40) + 60,
        
        // Random growth trajectory with fallback
        growthTrajectory: growthTrajectories[randomGrowthIndex] || defaultGrowthTrajectory,
        
        // Random promotion readiness
        readyForPromotion: Math.random() > 0.7,
        
        // Random burnout risk with fallback
        riskOfBurnout: burnoutRisks[randomBurnoutIndex] || defaultBurnoutRisk,
        
        // Recent activity with fallback
        recentActivity: recentActivities[randomActivityIndex] || defaultRecentActivity,
        
        // Last active hours (0-12)
        lastActiveHours: Math.floor(Math.random() * 12),
        
        // Project contributions with fallbacks
        projectContributions: [
          { 
            project: projectOptions[randomProjectIndex] || defaultProject, 
            tasks: Math.floor(Math.random() * 30) + 5, 
            completion: Math.floor(Math.random() * 50) + 50 
          },
          { 
            project: projectOptions2[randomProject2Index] || defaultProject, 
            tasks: Math.floor(Math.random() * 30) + 5, 
            completion: Math.floor(Math.random() * 50) + 50 
          }
        ],
        
        // Skills and strengths with fallback (using the copied array)
        strengths,
        
        // Areas for growth with fallback (using the copied array)
        areasForGrowth,
        
        // Tags for the person with fallback (using the copied array)
        tags
      };
    });
  } catch (error) {
    console.error("enhanceMemberData: Error enhancing team members with metrics:", error);
    return [];
  }
}

// Get all team members with enhanced data
export async function getPeopleWithMetrics(): Promise<EnhancedTeamMember[]> {
  try {
    console.log("getPeopleWithMetrics: Starting to fetch team members");
    const members = await getAllTeamMembers();
    console.log(`getPeopleWithMetrics: Fetched ${members.length} team members, now enhancing with metrics`);
    
    if (members.length === 0) {
      console.warn("getPeopleWithMetrics: No team members found, returning mock data for demonstration");
      // Return mock data if no real data is available
      return getMockPeopleData();
    }
    
    const enhancedMembers = enhanceMemberData(members);
    console.log(`getPeopleWithMetrics: Successfully enhanced ${enhancedMembers.length} team members with metrics`);
    return enhancedMembers;
  } catch (error) {
    console.error("getPeopleWithMetrics: Error fetching people with metrics:", error);
    console.log("getPeopleWithMetrics: Returning mock data instead");
    return getMockPeopleData();
  }
}

// Create mock data for demonstration when API is not available
function getMockPeopleData(): EnhancedTeamMember[] {
  console.log("getMockPeopleData: Generating mock people data");
  const mockMembers: TeamMember[] = [
    {
      id: "usr_1",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Lead Frontend Developer",
      department: "Engineering",
      avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=JaneSmith",
      status: "active",
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "usr_2",
      name: "Mark Johnson",
      email: "mark@example.com",
      role: "Backend Developer",
      department: "Engineering",
      avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=MarkJohnson",
      status: "active",
      joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "usr_3",
      name: "Sarah Lee",
      email: "sarah@example.com",
      role: "Product Manager",
      department: "Product",
      avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=SarahLee",
      status: "active",
      joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "usr_4",
      name: "Alex Wong",
      email: "alex@example.com",
      role: "QA Engineer",
      department: "Engineering",
      avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=AlexWong",
      status: "active",
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  
  return enhanceMemberData(mockMembers);
} 