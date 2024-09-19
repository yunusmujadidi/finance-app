"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const transactionData = [
  { month: "Jan", expense: 500, income: 1000, savings: 500 },
  { month: "Feb", expense: 700, income: 1200, savings: 500 },
  { month: "Mar", expense: 600, income: 1100, savings: 500 },
  { month: "Apr", expense: 800, income: 1300, savings: 500 },
  { month: "May", expense: 750, income: 1400, savings: 650 },
  { month: "Jun", expense: 900, income: 1500, savings: 600 },
  { month: "Jul", expense: 850, income: 1600, savings: 750 },
  { month: "Aug", expense: 950, income: 1700, savings: 750 },
  { month: "Sep", expense: 1000, income: 1800, savings: 800 },
  { month: "Oct", expense: 1100, income: 1900, savings: 800 },
  { month: "Nov", expense: 1200, income: 2000, savings: 800 },
  { month: "Dec", expense: 1300, income: 2100, savings: 800 },
];

export function TransactionGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
        <CardDescription>
          Showing income and expense for the last 4 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          width={1300}
          height={300}
          data={transactionData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stackId="1"
            stroke="#3b82f6"
            fill="#3b82f6"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stackId="1"
            stroke="#ef4444"
            fill="#ef4444"
          />
        </AreaChart>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Income trending up <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - April 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
