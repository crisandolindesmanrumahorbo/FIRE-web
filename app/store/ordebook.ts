import { create } from 'zustand';

interface IOrderBook {
  symbol: string;
  bids: number[][];
  asks: number[][];
  timestamp: string;
}
export type OrderBookStore = {
  orderbook?: IOrderBook;
  setOrderbook: (data: IOrderBook) => void;
};

export const useOrderBook = create<OrderBookStore>((set) => ({
  orderbook: undefined,
  setOrderbook: (data) => {
    set({
      orderbook: data,
    });
  },
}));
