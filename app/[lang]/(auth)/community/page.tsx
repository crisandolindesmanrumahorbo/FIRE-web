import { getUser } from "@/app/utils/cookies";
import { StreamChat } from "stream-chat";
import Community from "./components/Community";

export default async function CommunityPage() {
  const user = await getUser();
  const userId = `${user.username}_${user.sub}`;
  const serverClient = StreamChat.getInstance(
    process.env.GET_STREAM_API_KEY || "",
    process.env.GET_STREAM_SECRET,
  );
  const token = serverClient.createToken(
    userId,
    Math.floor(Date.now() / 1000) + 60 * 60,
  );
  const channel = serverClient.channel("messaging", "custom_channel_id_1", {
    name: "🔥 Talk about Fire",
    image: "https://getstream.io/random_png/?name=fire",
  });
  const channel2 = serverClient.channel("messaging", "custom_channel_id_2", {
    name: "🎵 We don’t talk about Bruno",
    image: "https://getstream.io/random_png/?name=bruno",
  });
  await channel.addMembers([userId, "crisandolin", "crisandolin_2", "kimi_1"]);
  await channel2.addMembers([userId, "crisandolin", "crisandolin_2", "kimi_1"]);

  return (
    <Community
      apiKey={process.env.GET_STREAM_API_KEY || ""}
      userId={userId}
      userName={user.username}
      userToken={token}
    />
  );
}
