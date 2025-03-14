'use client';

import { useEffect, useState } from 'react';

const useListenSocket = ({ socket }: { socket?: WebSocket }) => {
  const [data, setData] = useState();
  useEffect(() => {
    if (socket) {
      const handleMessage = (event: MessageEvent) => {
        const data = event.data;
        setData(data);
      };
      socket.addEventListener('message', handleMessage);
      return () => {
        socket.removeEventListener('message', handleMessage);
      };
    }
  }, [socket]);
  return data;
};

export default useListenSocket;
