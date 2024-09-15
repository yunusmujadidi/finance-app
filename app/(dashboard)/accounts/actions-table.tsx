import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteAccount } from "@/lib/actions/account-actions";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { useEditAccount } from "@/lib/hooks/use-edit-account";
import { FinancialAccount } from "@prisma/client";
import { Delete, Edit, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ActionsTable = ({ data }: { data: FinancialAccount }) => {
  const { onOpen } = useEditAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      const result = await deleteAccount({
        id,
      });

      if (result.success) {
        toast.success("Account deleted successfully");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={false} onClick={() => onOpen(data)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={false}
            onClick={() => handleDelete(data.id)}
          >
            <Delete className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
