"use client";

import { Loader2, Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Transaction } from "@prisma/client";
import { useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UseNewTransaction } from "@/modules/transaction/hooks/use-new-transaction";
import {
  bulkCreateTransactions,
  deleteBulkTransactions,
} from "@/lib/actions/transaction-actions";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANT {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionClient = ({ data }: { data: Transaction[] }) => {
  const [variant, setVariant] = useState<VARIANT>(VARIANT.LIST);
  const [isPending, startTransition] = useTransition();
  const { onOpen } = UseNewTransaction();
  const [importResult, setImportRResult] = useState(INITIAL_IMPORT_RESULT);

  const router = useRouter();

  const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
    console.log({ results });
    setImportRResult(results);
    setVariant(VARIANT.IMPORT);
  };

  const onCancel = () => {
    setImportRResult(INITIAL_IMPORT_RESULT);
    setVariant(VARIANT.LIST);
  };

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

  const onSubmitImport = async (values: Transaction[]) => {
    startTransition(async () => {
      try {
        const result = await bulkCreateTransactions(values);

        toast.success(
          `Successfully created ${result.createdCount} transactions`
        );
        router.refresh();
      } catch (error) {
        toast.error("Failed to created transactions");
        console.error("Bulk create error:", error);
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

  if (variant === VARIANT.IMPORT) {
    return (
      <ImportCard
        data={importResult.data}
        onCancel={onCancel}
        onSubmit={onSubmitImport}
      />
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center  lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <UploadButton onUpload={onUpload} />
            <Button className="w-full lg:w-auto" size="sm" onClick={onOpen}>
              <Plus className="size-4 mr-4" /> Add new
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            onUpdate={() => {}}
            onDelete={handleBulkDelete}
            filterKey="payee"
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
