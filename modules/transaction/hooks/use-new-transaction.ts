import { create } from "zustand";

type newTransactionState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const UseNewTransaction = create<newTransactionState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
