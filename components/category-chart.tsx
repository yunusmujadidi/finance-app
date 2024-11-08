"use client";

import {
  AreaChart,
  BarChart,
  FileSearch,
  LineChart,
  PieChart,
  Radar,
  Target,
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
import { PieChartVariant } from "./pie-chart";
import { RadarChartVariant } from "./radar-chart";
import { RadialChartVariant } from "./radial-chart";

export const CategoryChart = ({ data }: { data: Summary }) => {
  const [chart, setChart] = useState("pie");
  const onChartChange = (type: string) => {
    setChart(type);
  };
  if (!data?.categories?.length) {
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

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>

        <Select defaultValue={chart} onValueChange={onChartChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {chart === "pie" ? (
          <PieChartVariant data={data.categories} />
        ) : chart === "radar" ? (
          <RadarChartVariant data={data.categories} />
        ) : (
          <RadialChartVariant data={data.categories} />
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
