"use client";
import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/components/account/new-account-sheet";
import { EditAccountSheeet } from "@/components/account/edit-account-sheet";

export const SheetProviders = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheeet />
    </>
  );
};
