import { create } from 'zustand';
import { IExpiry } from '../transaction/buy/components/BuyForm';

export enum WebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export type FormStore = {
  price: number;
  lot: number;
  symbol: string;
  expiry: IExpiry;
  reset: () => void;
  setPrice: (param: number) => void;
  setLot: (param: number) => void;
  setSymbol: (param: string) => void;
  setExpiry: (param: IExpiry) => void;
};

export const useForm = create<FormStore>((set) => ({
  price: 1000,
  lot: 0,
  symbol: '',
  expiry: {
    value: 'GFD',
    label: 'Good For Day',
  },
  reset: () =>
    set({
      price: 1000,
      lot: 0,
      symbol: '',
      expiry: {
        value: 'GFD',
        label: 'Good For Day',
      },
    }),
  setPrice: (data) => {
    set({
      price: data,
    });
  },
  setLot: (data) => {
    set({
      lot: data,
    });
  },
  setSymbol: (data) => {
    set({
      symbol: data,
    });
  },
  setExpiry: (data) => {
    set({
      expiry: data,
    });
  },
}));
