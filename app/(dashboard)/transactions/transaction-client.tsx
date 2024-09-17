"use client";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Transaction } from "@prisma/client";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UseNewTransaction } from "@/modules/transaction/hooks/use-new-transaction";
import { deleteBulkTransactions } from "@/lib/actions/transaction-actions";

const TransactionClient = ({ data }: { data: Transaction[] }) => {
  const [isPending, startTransition] = useTransition();
  const { onOpen } = UseNewTransaction();

  const router = useRouter();

  const handleBulkDelete = async (selectedIds: string[]) => {
    startTransition(async () => {
      try {
        const result = await deleteBulkTransactions(selectedIds as string[]);

        toast.success(
          `Successfully deleted ${result.deletedCount} transactions`
        );
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete transactions");
        console.error("Bulk delete error:", error);
      }
    });
  };

  if (!data) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4 mr-4" /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onUpdate={() => {}}
            onDelete={handleBulkDelete}
            filterKey="recepient"
            columns={columns}
            data={data as any}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionClient;
