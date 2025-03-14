import { create } from 'zustand';

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
  data: string;
  setSocket: (socket: WebSocket | undefined) => void;
};

export const useWsOrder = create<MarketSocketStore>((set) => ({
  socket: undefined,
  readyState: 3,
  data: '',
  initWS: (url: string) => {
    const socket = new WebSocket(url ?? 'wss://api.whitebit.com/ws');

    socket.onopen = () => {
      set({ readyState: socket.readyState });
      set({ socket: socket });
    };

    socket.onclose = () => {
      set({ readyState: socket.CLOSED });
    };
  },
  setSocket: (socket) => {
    set({ socket });
  },
}));
