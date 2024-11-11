"use client";

import { CategoryChart } from "./category-chart";
import { Chart } from "./chart";
import { PieChartVariant } from "./pie-chart";

export interface Summary {
  remainingAmount: number;
  remainingChange: number;
  incomeAmount: number;
  incomeChange: number;
  expensesAmount: number;
  expenseChange: number;
  categories: { name: string; value: number }[];
  days: { date: Date; income: number; expenses: number }[];
}

export const DataCharts = ({ summary }: { summary: Summary }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={summary} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <CategoryChart data={summary} />
      </div>
    </div>
  );
};
