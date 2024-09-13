import { UseNewAccount } from "@/lib/hooks/use-new-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AccountForm } from "./account-form";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = UseNewAccount();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={() => {}} disabled={false} />
      </SheetContent>
    </Sheet>
  );
};
