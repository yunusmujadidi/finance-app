"use client";
import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/modules/account/components/new-account-sheet";
import { EditAccountSheet } from "@/modules/account/components/edit-account-sheet";
import { EditCategorySheet } from "@/modules/category/components/edit-category-sheet";
import { NewCategorySheet } from "@/modules/category/components/new-category-sheet";
import { NewTransactionSheet } from "@/modules/transaction/components/new-transaction-sheet";
import { EditTransactionSheet } from "@/modules/transaction/components/edit-transaction-sheet";
import { Categories, FinancialAccount } from "@prisma/client";

export const SheetClient = ({
  account,
  category,
}: {
  account: FinancialAccount[];
  category: Categories[];
}) => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <EditCategorySheet />
      <NewCategorySheet />
      <NewTransactionSheet category={category} account={account} />
      <EditTransactionSheet />
    </>
  );
};
