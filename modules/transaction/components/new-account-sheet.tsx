import { UseNewAccount } from "@/feature/account/hooks/use-new-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { TransactionForm, FormValues } from "./transaction-form";
import { createAccount } from "@/lib/actions/account-actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = UseNewAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const result = await createAccount({
      name: values.name,
    });
    setLoading(false);
    if (result.success) {
      toast.success("Account created successfully");
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
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions
          </SheetDescription>
        </SheetHeader>
        <TransactionForm onSubmit={onSubmit} disabled={loading} />
      </SheetContent>
    </Sheet>
  );
};
