"use client";

import { Chart } from "./chart";
import { DonutChart } from "./pie-chart";

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
  console.log(summary);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={summary} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <DonutChart />
      </div>
    </div>
  );
};
