"use client";

import { useEffect, useState } from "react";

type SocketMessage = {
  status: string;
  message: string;
};

const useListenSocket = ({ socket }: { socket?: WebSocket }) => {
  const [data, setData] = useState<SocketMessage>();
  useEffect(() => {
    if (socket) {
      const handleMessage = (event: MessageEvent) => {
        const data_str = event.data;
        const data = JSON.parse(data_str);
        setData(data);
      };
      socket.addEventListener("message", handleMessage);
      return () => {
        socket.removeEventListener("message", handleMessage);
      };
    }
  }, [socket]);
  return data;
};

export default useListenSocket;
