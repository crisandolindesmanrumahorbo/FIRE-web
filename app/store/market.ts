import { create } from 'zustand';
import { useOrderBook } from './ordebook';
import { MarketDataDetailInfo, useCurrentPrice } from './current-price';

export enum WebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export type MarketSocketStore = {
  socket?: WebSocket;
  initWS: (wsUrl: string) => void;
  readyState: WebSocketReadyState;
  setSocket: (socket: WebSocket | undefined) => void;
};

const setOrderbook = useOrderBook.getState().setOrderbook;
const setCurrentPriceMap = useCurrentPrice.getState().setCurrentPriceMap;

const mapCurrentPrice = (
  currentPrice: MarketDataDetailInfo
): MarketDataDetailInfo => {
  return {
    symbol: currentPrice.symbol,
    lastPrice: currentPrice.lastPrice,
    lastChangePcnt: currentPrice.lastChangePcnt,
  };
};

export const useMarket = create<MarketSocketStore>((set) => ({
  socket: undefined,
  readyState: 3,
  initWS: (url: string) => {
    const socket = new WebSocket(url ?? 'wss://api.whitebit.com/ws');

    socket.onopen = () => {
      set({ readyState: socket.readyState });
      set({ socket: socket });
    };

    socket.onmessage = (event: MessageEvent) => {
      const message = event.data;
      const data = JSON.parse(message);
      if (data?.table === 'orderBook10') {
        setOrderbook(data.data[0]);
        return;
      }
      if (data?.table === 'instrument') {
        const message = data.data[0];
        const currentPrice = mapCurrentPrice(message);
        setCurrentPriceMap(currentPrice);
        return;
      }
    };

    socket.onclose = () => {
      set({ readyState: socket.CLOSED });
    };
  },
  setSocket: (socket) => {
    set({ socket });
  },
}));
