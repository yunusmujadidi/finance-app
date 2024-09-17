import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTransaction } from "@/lib/actions/transaction-actions";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { useEditTransaction } from "@/modules/transaction/hooks/use-edit-transaction";
import { Transaction } from "@prisma/client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ActionsTable = ({ data }: { data: Transaction }) => {
  const { onOpen } = useEditTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      const result = await deleteTransaction({
        id,
      });

      if (result.success) {
        toast.success("Transaction deleted successfully");
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
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
