"use client";

import { cva, type VariantProps } from "class-variance-authority";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import CountUp from "react-countup";

const boxVariant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "text-blue-500",
      success: "text-emerald-500",
      danger: "text-rose-500",
      warning: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

type DataCardProps = BoxVariants &
  IconVariants & {
    icon: LucideIcon;
    title: string;
    value?: number;
    dateRange: string;
    percentageChange?: number;
  };
export const DataCard = ({
  title,
  icon: Icon,
  value = 0,
  variant,
  dateRange,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="line-clamp-1 text-2xl">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn(
            "text-muted-foreground text-sm line-clamp-1 ",
            percentageChange > 0 && "text-emerald-500",
            percentageChange < 0 && "text-rose-500"
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last
          period
        </p>
      </CardContent>
    </Card>
  );
};
