import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
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

export const RadarChartVariant = ({
  data = [],
}: {
  data?: {
    name: string;
    value: number;
  }[];
}) => {
  return (
    <ChartContainer className="w-full h-[350px]" config={chartConfig}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius={60}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
      </RadarChart>
    </ChartContainer>
  );
};
