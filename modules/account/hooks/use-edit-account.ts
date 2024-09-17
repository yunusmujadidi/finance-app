import { FinancialAccount } from "@prisma/client";
import { create } from "zustand";

type newAccountState = {
  data?: FinancialAccount;
  isOpen: boolean;
  onOpen: (data: FinancialAccount) => void;
  onClose: () => void;
};

export const useEditAccount = create<newAccountState>((set) => ({
  data: undefined,
  isOpen: false,
  onOpen: (data: FinancialAccount) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));
