"use client";
import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/components/account/new-account-sheet";
import { EditAccountSheet } from "@/components/account/edit-account-sheet";
import { EditCategorySheet } from "@/feature/category/edit-category-sheet";
import { NewCategorySheet } from "@/feature/category/new-category-sheet";

export const SheetProviders = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <EditCategorySheet />
      <NewCategorySheet />
    </>
  );
};
