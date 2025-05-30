"use client";

import { ChannelList, DefaultChannelData } from "stream-chat-react";

declare module "stream-chat" {
  interface CustomChannelData extends DefaultChannelData {
    image?: string;
  }
}

import { useEffect } from "react";
import type {
  User,
  ChannelSort,
  ChannelFilters,
  ChannelOptions,
} from "stream-chat";

import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import { useTheme } from "next-themes";

type Props = {
  apiKey: string;
  userId: string;
  userName: string;
  userToken: string;
};

const Community = ({ apiKey, userId, userName, userToken }: Props) => {
  const { theme } = useTheme();
  const user: User = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?name=${userName}`,
  };
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  const sort: ChannelSort = { last_message_at: -1 };
  const filters: ChannelFilters = {
    type: "messaging",
    members: { $in: [userId] },
  };
  const options: ChannelOptions = {
    state: true,
    watch: true,
    limit: 10,
  };

  useEffect(() => {
    if (!client) return;

    const setupChannels = async () => {
      const ch1 = client.channel("messaging", "custom_channel_id_1", {
        members: [userId],
      });

      const ch2 = client.channel("messaging", "custom_channel_id_2", {
        members: [userId],
      });

      await Promise.all([ch1.watch(), ch2.watch()]);
    };

    setupChannels();
  }, [client, userId]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat
      client={client}
      theme={
        theme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"
      }
    >
      <div className="flex h-[91vh] overflow-hidden">
        <div className="sm:w-[30%] w-[20%] h-min-screen">
          <ChannelList filters={filters} sort={sort} options={options} />
        </div>
        <div className="w-full h-min-screen">
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
};

export default Community;
