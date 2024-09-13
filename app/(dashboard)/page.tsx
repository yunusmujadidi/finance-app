import { getCurrentUser } from "@/lib/getCurrentUser";
import React from "react";

const Dashboard = async () => {
  const currentUser = await getCurrentUser();
  return <div>{currentUser?.name ? currentUser?.name : "no currentuser"}</div>;
};

export default Dashboard;
