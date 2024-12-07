import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

export const LineChartVariant = ({ chartData }: { chartData: chartData[] }) => {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart accessibilityLayer data={chartData} height={350}>
        <CartesianGrid strokeDasharray="3 3" />
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
        <Line
          dot={false}
          strokeWidth={2}
          dataKey="income"
          stroke="#3b82f6"
          className="drop-shadow-sm"
        />
        <Line
          dot={false}
          strokeWidth={2}
          className="drop-shadow-sm"
          dataKey="expenses"
          stroke="#f43f5e"
        />
      </LineChart>
    </ChartContainer>
  );
};
