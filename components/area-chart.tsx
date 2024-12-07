import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { format } from "date-fns";

interface chartData {
  date: string;
  income: number;
  expenses: number;
}

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const AreaChartVariant = ({ chartData }: { chartData: chartData[] }) => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData} height={350}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="income" x1={0} x2={0} y1={0} y2={1}>
            <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expense" x1={0} x2={0} y1={0} y2={1}>
            <stop offset="2%" stopColor="#f43f53" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#f43f53" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          // tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#income)"
          className="drop-shadow-sm"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stackId="expense"
          strokeWidth={2}
          stroke="#f43f53"
          fill="url(#income)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ChartContainer>
  );
};
