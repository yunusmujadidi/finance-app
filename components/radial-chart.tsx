import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { format } from "date-fns";
import { formatCurrency, formatPercentage } from "@/lib/utils";

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

const Colors = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

export const RadialChartVariant = ({
  data = [],
}: {
  data?: {
    name: string;
    value: number;
  }[];
}) => {
  return (
    <ChartContainer className="w-full h-[350px]" config={chartConfig}>
      <ResponsiveContainer width="100%" height={350}>
        <RadialBarChart
          cx="50%"
          cy="30%"
          outerRadius="90%"
          innerRadius="40%"
          data={data.map((item, index) => ({
            ...item,
            fill: Colors[index % Colors.length],
          }))}
        >
          <RadialBar
            label={{
              position: "insideStart",
              fill: "#fff",
              fontSize: "12px",
            }}
            background
            dataKey="value"
          />
          <ChartLegend
            layout="horizontal"
            verticalAlign="bottom"
            align="right"
            iconType="circle"
            content={({ payload }: any) => {
              return (
                <ul className="flex flex-col space-y-2">
                  {payload.map((entry: any, index: number) => (
                    <li
                      key={`item-${index}`}
                      className="flex items-center space-x-2"
                    >
                      <span
                        className="size-2 rounded-4"
                        style={{ backgroundColor: entry.color }}
                      />
                      <div className="space-x-1">
                        <span className="text-sm text-muted-foreground">
                          {entry.value} =
                        </span>
                        <span className="text-sm ">
                          {formatCurrency(entry.payload.value)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
