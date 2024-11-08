"use client";

import {
  AreaChart,
  BarChart,
  FileSearch,
  LineChart,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Summary } from "./data-charts";
import { AreaChartVariant } from "./area-chart";
import { BarChartVariant } from "./bar-chart";
import { LineChartVariant } from "./line-chart";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const Chart = ({ data }: { data: Summary }) => {
  const [chart, setChart] = useState("area");
  const onChartChange = (type: string) => {
    setChart(type);
  };
  if (!data?.days?.length) {
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
          <CardDescription>No date range available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No data for this period
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.days.map((day) => ({
    date: format(new Date(day.date), "MMM dd"),
    income: day.income,
    expenses: Math.abs(day.expenses), // Convert negative to positive for display
  }));

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>

        <CardDescription>
          {format(new Date(data.days[0].date), "MMMM dd")} -{" "}
          {format(
            new Date(data.days[data.days.length - 1].date),
            "MMMM dd, yyyy"
          )}
        </CardDescription>
        <Select defaultValue={chart} onValueChange={onChartChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {chart === "area" ? (
          <AreaChartVariant chartData={chartData} />
        ) : chart === "bar" ? (
          <BarChartVariant chartData={chartData} />
        ) : (
          <LineChartVariant chartData={chartData} />
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing transactions for the last 30 days{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};
