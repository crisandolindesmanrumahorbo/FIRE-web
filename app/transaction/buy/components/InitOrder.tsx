'use client';
import { useWsOrder, WebSocketReadyState } from '@/app/store/order';
import { getTokenCookies } from '@/app/utils/cookies';
import { ReactElement, useEffect } from 'react';

export default function InitOrder({ children }: { children: ReactElement }) {
  const initWs = useWsOrder((state) => state.initWS);
  const socket = useWsOrder((state) => state.socket);
  const readyState = useWsOrder((state) => state.readyState);
  const setSocket = useWsOrder((state) => state.setSocket);
  useEffect(() => {
    const init = async () => {
      const token = await getTokenCookies();
      if (!socket && readyState !== WebSocketReadyState.OPEN) {
        initWs(`ws://127.0.0.1:7878?token=${token}`);
      }
    };
    init();
    return () => {
      socket?.close();
      if (socket) {
        setSocket(undefined);
      }
    };
  }, [readyState, initWs, socket, setSocket]);
  return <>{children}</>;
}
