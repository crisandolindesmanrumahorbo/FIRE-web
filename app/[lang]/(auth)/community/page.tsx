import Community from "./community";

const userId = "crisandolin";
const userName = "cris";
export default function CommunityPage() {
  return (
    <Community
      apiKey={process.env.GET_STREAM_API_KEY || ""}
      userId={userId}
      userName={userName}
      userToken={process.env.GET_STREAM_TOKEN || ""}
    />
  );
}
