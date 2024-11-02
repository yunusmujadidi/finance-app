import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ChartConfig } from "@/components/ui/chart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / Math.abs(previous)) * 100;
};

export const fillMissingDays = (
  activeDays: Array<{ date: Date; income: number; expenses: number }>,
  startDate: Date,
  endDate: Date
) => {
  const result = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const activeDay = activeDays.find(
      (day) =>
        day.date.toISOString().split("T")[0] ===
        currentDate.toISOString().split("T")[0]
    );

    result.push({
      date: new Date(currentDate),
      income: activeDay?.income || 0,
      expenses: activeDay?.expenses || 0,
    });

    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return result;
};
