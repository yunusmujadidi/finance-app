import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ChartConfig } from "@/components/ui/chart";
import { format, subDays } from "date-fns";

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

export const chartConfig: ChartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
};

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

type Period = {
  from?: string | Date;
  to?: string | Date;
};

export const formatDateRange = ({ period }: { period: Period }) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd y"
    )}`;
  }
  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.to,
      "LLL dd y"
    )}`;
  }

  return format(period.from, "LLL dd y");
};

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false }
) {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) return `+${result}`;

  return result;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",

    timeZone: "Asia/Jakarta",
  };
  return date.toLocaleString("id-ID", options);
}
