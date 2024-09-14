"use client";
import { Button } from "@/components/ui/button";
import { UseNewAccount } from "@/lib/hooks/use-new-account";
import React from "react";

const Dashboard = () => {
  const { onOpen } = UseNewAccount();
  return (
    <div>
      <Button onClick={onOpen}>Add an account</Button>
    </div>
  );
};

export default Dashboard;
