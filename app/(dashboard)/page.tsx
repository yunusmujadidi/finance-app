import { DataGrid } from "@/components/data-grid";
import { getSummary } from "@/lib/actions/summary-actions";

const Dashboard = async () => {
  const summary = await getSummary({
    from: "2023-01-01",
    to: "2025-01-01",
  });

  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
      <DataGrid summary={summary} />
    </div>
  );
};
export default Dashboard;
