import { DataCharts, Summary } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { getSummary } from "@/lib/actions/summary-actions";

const Dashboard = async () => {
  const summary: Summary = await getSummary();

  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
      <DataGrid summary={summary} />
      <DataCharts summary={summary} />
    </div>
  );
};
export default Dashboard;
