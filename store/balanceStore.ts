import { zustandStorage } from "@/store/mmkvStore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface IBalanceState {
  transactions: Transaction[];
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

export const useBalanceStore = create<IBalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
      balance: () => get().transactions.reduce((a, b) => a + b.amount, 0),
      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
