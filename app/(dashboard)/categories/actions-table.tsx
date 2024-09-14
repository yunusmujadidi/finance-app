import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategory } from "@/lib/actions/category-actions";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { useEditCategory } from "@/lib/hooks/use-edit-category";
import { Delete, Edit, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ActionsTable = ({ id }: { id: string }) => {
  const { onOpen } = useEditCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      const result = await deleteCategory({
        id,
      });

      if (result.success) {
        toast.success("Category deleted successfully");
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
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={false} onClick={() => handleDelete(id)}>
            <Delete className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
