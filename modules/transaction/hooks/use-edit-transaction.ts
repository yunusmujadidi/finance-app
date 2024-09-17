import { Transaction } from "@prisma/client";
import { create } from "zustand";

type newTransactionState = {
  data?: Transaction;
  isOpen: boolean;
  onOpen: (data: Transaction) => void;
  onClose: () => void;
};

export const useEditTransaction = create<newTransactionState>((set) => ({
  data: undefined,
  isOpen: false,
  onOpen: (data: Transaction) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));
