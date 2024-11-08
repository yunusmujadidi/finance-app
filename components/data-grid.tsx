"use client";
import { useSearchParams } from "next/navigation";
import { DataCard } from "./data-card";
import { formatDateRange } from "@/lib/utils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Summary } from "./data-charts";

export const DataGrid = ({ summary }: { summary: Summary }) => {
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const dateRangeLabel = formatDateRange({ period: { to, from } });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 pb-2">
      <DataCard
        title="Remaining"
        value={summary.remainingAmount}
        percentageChange={summary?.remainingChange}
        icon={Wallet}
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={summary.incomeAmount}
        percentageChange={summary.incomeChange}
        icon={TrendingUp}
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={summary.expensesAmount}
        percentageChange={summary.expenseChange}
        icon={TrendingDown}
        dateRange={dateRangeLabel}
      />
    </div>
  );
};
