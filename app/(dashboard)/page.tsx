import { DataCharts, Summary } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { getSummary } from "@/lib/actions/summary-actions";
import { Suspense } from "react";
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
      <Suspense fallback={<div>Loading...</div>}>
        <DataGrid summary={summary} />
        <DataCharts summary={summary} />
      </Suspense>
    </div>
  );
};

export default Dashboard;
