import { CryptoInfo, Currency } from "@/@types";
import { create } from "zustand";

type SetCryptoInfoType = {
  data: {
    [key: string]: CryptoInfo;
  };
};

export interface ICryptoStore {
  cryptoList: Currency[];
  cryptoInfo: {
    [key: string]: CryptoInfo;
  };
  getCryptoInfo: (id: string) => CryptoInfo;
  setCryptoList: (data: Currency[]) => void;
  setCryptoInfo: (lis: SetCryptoInfoType) => void;
}

export const useCryptoStore = create<ICryptoStore>((set, get) => ({
  cryptoList: [],
  cryptoInfo: {},
  getCryptoInfo: (id: string) => {
    return get().cryptoInfo[id];
  },
  setCryptoList: (data: Currency[]) => {
    set({ cryptoList: data });
  },
  setCryptoInfo: (list: SetCryptoInfoType) => {
    set({
      cryptoInfo: list?.data,
    });
  },
}));
