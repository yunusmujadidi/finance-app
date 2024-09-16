"use client";
import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/modules/account/components/new-account-sheet";
import { EditAccountSheet } from "@/modules/account/components/edit-account-sheet";
import { EditCategorySheet } from "@/modules/category/components/edit-category-sheet";
import { NewCategorySheet } from "@/modules/category/components/new-category-sheet";
import { NewTransactionSheet } from "@/modules/transaction/components/new-account-sheet";
import { EditTransactionSheet } from "@/modules/transaction/components/edit-account-sheet";

export const SheetProviders = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <EditCategorySheet />
      <NewCategorySheet />
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
};
