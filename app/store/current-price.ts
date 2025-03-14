import { create } from 'zustand';

export interface MarketDataDetailInfo {
  symbol: string;
  lastPrice: number;
  lastChangePcnt: number;
}
export type CurrentPriceStore = {
  currentPriceMap: { [key in string]: MarketDataDetailInfo };
  setCurrentPriceMap: (updatedData: MarketDataDetailInfo) => void;
};

export const useCurrentPrice = create<CurrentPriceStore>((set) => ({
  currentPriceMap: {},
  setCurrentPriceMap: (updatedData) => {
    set((state) => ({
      currentPriceMap: {
        ...state.currentPriceMap,
        [updatedData.symbol]: {
          symbol: updatedData.symbol,
          lastPrice:
            updatedData.lastPrice ??
            state.currentPriceMap[updatedData.symbol].lastPrice,
          lastChangePcnt:
            updatedData.lastChangePcnt ??
            state.currentPriceMap[updatedData.symbol].lastChangePcnt,
        },
      },
    }));
  },
}));
