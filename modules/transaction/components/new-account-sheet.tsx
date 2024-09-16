import { UseNewTransaction } from "@/modules/transaction/hooks/use-new-transaction";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm, FormValues } from "./transaction-form";
import { createTransaction } from "@/lib/actions/transaction-actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = UseNewTransaction();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const result = await createTransaction({
      name: values.name,
    });
    setLoading(false);
    if (result.success) {
      toast.success("Transaction created successfully");
      router.refresh();
      onClose();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create a new transaction to track your transactions
          </SheetDescription>
        </SheetHeader>
        <TransactionForm onSubmit={onSubmit} disabled={loading} />
      </SheetContent>
    </Sheet>
  );
};
