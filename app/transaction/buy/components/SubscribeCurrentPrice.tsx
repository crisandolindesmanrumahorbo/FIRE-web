'use client';
import { useMarket } from '@/app/store/market';
import { WebSocketReadyState } from '@/app/store/order';
import { ReactElement, useEffect } from 'react';

export default function SubscribeCurrentPrice({
  children,
  symbol,
}: {
  children: ReactElement;
  symbol: string;
}) {
  const socket = useMarket((state) => state.socket);
  const readyState = useMarket((state) => state.readyState);

  useEffect(() => {
    if (socket && readyState === WebSocketReadyState.OPEN) {
      const message = {
        op: 'subscribe',
        args: [`instrument:${symbol}`],
      };
      socket.send(JSON.stringify(message));
    }

    return () => {
      const message = {
        op: 'unsubscribe',
        args: [`instrument:${symbol}`],
      };
      socket?.send(JSON.stringify(message));
    };
  }, [readyState, socket, symbol]);
  return <>{children}</>;
}
