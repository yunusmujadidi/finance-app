import { Suspense } from "react";

import { DataCharts, Summary } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSummary } from "@/lib/actions/summary-actions";
export const dynamic = "force-dynamic";

interface DashboardProps {
  searchParams: {
    accountId?: string;
    from?: string;
    to?: string;
  };
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const summary: Summary = await getSummary({
    accountId: searchParams.accountId,
    from: searchParams.from,
    to: searchParams.to,
  });

  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 pb-2">
            <Card className="border-none drop-shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between gap-x-4">
                <div className="space-y-2">
                  <CardTitle className="line-clamp-1 text-2xl">
                    <Skeleton />
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    <Skeleton />
                  </CardDescription>
                </div>
                <Skeleton />
              </CardHeader>
              <CardContent>
                <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
                  <Skeleton />
                </h1>
                <p className="text-muted-foreground text-sm line-clamp-1 ">
                  <Skeleton />
                </p>
              </CardContent>
            </Card>
          </div>
        }
      >
        <DataGrid summary={summary} />
      </Suspense>
      <DataCharts summary={summary} />
    </div>
  );
};

export default Dashboard;
