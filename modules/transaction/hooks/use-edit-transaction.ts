import { FinancialAccount } from "@prisma/client";
import { create } from "zustand";

type newTransactionState = {
  data?: FinancialAccount;
  isOpen: boolean;
  onOpen: (data: FinancialAccount) => void;
  onClose: () => void;
};

export const useEditTransaction = create<newTransactionState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (data: FinancialAccount) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));
