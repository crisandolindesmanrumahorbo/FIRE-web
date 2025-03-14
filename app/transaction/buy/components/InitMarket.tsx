'use client';
import { useMarket } from '@/app/store/market';
import { WebSocketReadyState } from '@/app/store/order';
import { ReactElement, useEffect } from 'react';

export default function InitMarket({ children }: { children: ReactElement }) {
  const initWs = useMarket((state) => state.initWS);
  const socket = useMarket((state) => state.socket);
  const readyState = useMarket((state) => state.readyState);
  const setSocket = useMarket((state) => state.setSocket);
  useEffect(() => {
    const init = async () => {
      if (!socket && readyState !== WebSocketReadyState.OPEN) {
        initWs('wss://ws.bitmex.com/realtime');
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
