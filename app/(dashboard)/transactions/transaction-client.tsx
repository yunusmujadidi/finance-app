"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Transaction } from "@prisma/client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UseNewTransaction } from "@/modules/transaction/hooks/use-new-transaction";
import {
  bulkCreateTransactions,
  deleteBulkTransactions,
} from "@/lib/actions/transaction-actions";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { useSelectAccount } from "@/modules/account/hooks/use-select-account";

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
  const [importResult, setImportResult] = useState(INITIAL_IMPORT_RESULT);
  const [AccountDialog, confirm] = useSelectAccount();

  const { onOpen } = UseNewTransaction();
  const router = useRouter();

  const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
    setImportResult(results);
    setVariant(VARIANT.IMPORT);
  };

  const onCancel = () => {
    setImportResult(INITIAL_IMPORT_RESULT);
    setVariant(VARIANT.LIST);
  };

  const handleBulkDelete = (selectedIds: string[]) => {
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
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue");
    }

    const formattedValues = values.map((transaction) => ({
      ...transaction,
      accountId: accountId as string,
    }));

    startTransition(async () => {
      try {
        const result = await bulkCreateTransactions(formattedValues);
        if (result) {
          toast.success(
            `Successfully created ${result.createdCount} transactions`
          );
          setVariant(VARIANT.LIST);
          router.refresh();
        }
      } catch (error) {
        toast.error("Failed to create transactions");
        console.error("Bulk create error:", error);
      }
    });
  };

  if (variant === VARIANT.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResult.data}
          onCancel={onCancel}
          onSubmit={onSubmitImport}
        />
      </>
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
