"use client";
import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/components/account/new-account-sheet";
import { EditAccountSheet } from "@/components/account/edit-account-sheet";
import { EditCategorySheet } from "@/components/category/edit-category-sheet";
import { NewCategorySheet } from "@/components/category/new-category-sheet";

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
