"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm, FormValues } from "./transaction-form";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { Categories, FinancialAccount } from "@prisma/client";
import { useEditTransaction } from "../hooks/use-edit-transaction";
import {
  deleteTransaction,
  updateTransactions,
} from "@/lib/actions/transaction-actions";

export const EditTransactionSheet = ({
  account,
  category,
}: {
  account: FinancialAccount[];
  category: Categories[];
}) => {
  const { isOpen, onClose, data } = useEditTransaction();
  const [loading, setLoading] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const result = await updateTransactions({
      ...values,
      id: data?.id as string,
    });
    setLoading(false);
    if (result.success) {
      toast.success("Transaction updated successfully");
      router.refresh();
      onClose();
    } else {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      setLoading(true);
      const result = await deleteTransaction({
        id: data?.id as string,
      });
      setLoading(false);
      if (result.success) {
        toast.success("Transaction deleted successfully");
        router.refresh();
        onClose();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const defaultValues = data
    ? {
        amount: data.amount || undefined,
        payee: data.payee || "",
        notes: data.notes || "",
        date: data.date ? new Date(data.date) : undefined,
        categoryId: data.categoryId || "",
        accountId: data.accountId || "",
      }
    : undefined;

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Create a new transaction to track your transactions
            </SheetDescription>
          </SheetHeader>
          <TransactionForm
            onDelete={onDelete}
            id={data?.id}
            onSubmit={onSubmit}
            disabled={loading}
            defaultValues={defaultValues}
            account={account}
            category={category}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
