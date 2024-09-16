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
import { Categories, FinancialAccount } from "@prisma/client";
import { getCurrentUser } from "@/lib/actions/get-current-user";

export const NewTransactionSheet = ({
  account,
  category,
}: {
  account: FinancialAccount[];
  category: Categories[];
}) => {
  const { isOpen, onClose } = UseNewTransaction();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        toast.error("Please login first!");
        return;
      }

      const result = await createTransaction({ values });
      if (result) {
        toast.success("Transaction created successfully");
        router.refresh();
        onClose();
      } else {
        toast.error("Failed to create transaction");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("An error occurred while creating the transaction");
    } finally {
      setLoading(false);
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
        <TransactionForm
          account={account}
          onSubmit={onSubmit}
          disabled={loading}
          category={category}
        />
      </SheetContent>
    </Sheet>
  );
};
