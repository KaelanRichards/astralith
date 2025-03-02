import { PulseDigest } from "@/components/PulseDigest";

export default function PulsePage() {
  // In a real app, you would get the team ID from the user's session or URL params
  const teamId = "123e4567-e89b-12d3-a456-426614174000";

  return (
    <div className="container py-8">
      <PulseDigest teamId={teamId} />
    </div>
  );
} 