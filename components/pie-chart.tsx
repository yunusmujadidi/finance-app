import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
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
import { formatPercentage } from "@/lib/utils";

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

export const PieChartVariant = ({
  data = [],
}: {
  data?: {
    name: string;
    value: number;
  }[];
}) => {
  return (
    <ChartContainer config={chartConfig}>
      <PieChart height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
          ))}
        </Pie>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <ChartLegend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col -mt-24 space-y-2">
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
                        {entry.value}
                      </span>
                      <span>
                        {formatPercentage(entry.payload.percent * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </PieChart>
    </ChartContainer>
  );
};
