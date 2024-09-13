"use client";
import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/components/account/new-account-sheet";

export const SheetProviders = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
    </>
  );
};