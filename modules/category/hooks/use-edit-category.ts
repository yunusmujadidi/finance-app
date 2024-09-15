import { Categories } from "@prisma/client";
import { create } from "zustand";

type newCategoryState = {
  data?: Categories;
  isOpen: boolean;
  onOpen: (data: Categories) => void;
  onClose: () => void;
};

export const useEditCategory = create<newCategoryState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (data: Categories) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));
