"use client";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseNewAccount } from "@/modules/account/hooks/use-new-account";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { FinancialAccount } from "@prisma/client";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { bulkDeleteAccounts } from "@/lib/actions/account-actions";
import { useRouter } from "next/navigation";

const AccountClient = ({ data }: { data: FinancialAccount[] }) => {
  const [isPending, startTransition] = useTransition();
  const { onOpen } = UseNewAccount();

  const router = useRouter();

  interface BulkDeleteResult {
    success: boolean;
    deletedCount?: number;
    error?: string;
  }

  const handleBulkDelete = async (selectedIds: string[]) => {
    startTransition(async () => {
      try {
        const result = await bulkDeleteAccounts(selectedIds);

        if ("deletedCount" in result) {
          toast.success(`Successfully deleted ${result.deletedCount} accounts`);
        }
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete accounts");
        console.error("Bulk delete error:", error);
      }
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Account page</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4 mr-4" /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onUpdate={() => {}}
            onDelete={handleBulkDelete}
            filterKey="name"
            columns={columns}
            data={data}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountClient;
