import { useEditAccount } from "@/feature/account/hooks/use-edit-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { AccountForm, FormValues } from "./account-form";
import {
  deleteAccount,
  getAccountById,
  updateAccount,
} from "@/lib/actions/account-actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { FinancialAccount } from "@prisma/client";

export const EditAccountSheet = () => {
  const { isOpen, onClose, data } = useEditAccount();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<FinancialAccount | null>(null);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );

  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const result = await updateAccount({
      name: values.name,
      id: data?.id as string,
    });
    setLoading(false);
    if (result.success) {
      toast.success("Account updated successfully");
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
      const result = await deleteAccount({
        id: data?.id as string,
      });
      setLoading(false);
      if (result.success) {
        toast.success("Account deleted successfully");
        router.refresh();
        onClose();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>
              Create a new account to track your transactions
            </SheetDescription>
          </SheetHeader>
          <AccountForm
            onDelete={onDelete}
            id={data?.id}
            onSubmit={onSubmit}
            disabled={loading}
            defaultValues={data ? { name: data.name } : { name: "" }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
