"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", income: 1000, expense: 800 },
  { month: "February", income: 1200, expense: 900 },
  { month: "March", income: 1100, expense: 850 },
  { month: "April", income: 1300, expense: 950 },
  { month: "May", income: 1400, expense: 1000 },
  { month: "June", income: 1500, expense: 1100 },
  { month: "July", income: 1600, expense: 1150 },
  { month: "August", income: 1700, expense: 1200 },
  { month: "September", income: 1800, expense: 1250 },
  { month: "October", income: 1900, expense: 1300 },
  { month: "November", income: 2000, expense: 1350 },
  { month: "December", income: 2100, expense: 1400 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="#3B82F6" radius={4} />
            <Bar dataKey="expense" fill="#EF4444" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Income trending up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing income and expense for the entire year
        </div>
      </CardFooter>
    </Card>
  );
}
