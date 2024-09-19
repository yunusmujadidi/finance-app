"use client";
import { Button } from "@/components/ui/button";
import { UseNewAccount } from "@/modules/account/hooks/use-new-account";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { chartConfig } from "@/lib/utils";
import { TransactionGraph } from "@/components/transaction-graph";
import { CategoryGraph } from "@/components/category-graph";
import { BarChartPage } from "@/components/bar-chart";

const Dashboard = () => {
  const { onOpen } = UseNewAccount();

  return <div>Helo</div>;
};
export default Dashboard;
