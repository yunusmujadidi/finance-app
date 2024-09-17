import { cn } from "@/lib/utils";
import { useEditCategory } from "@/modules/category/hooks/use-edit-category";
import { useEditTransaction } from "@/modules/transaction/hooks/use-edit-transaction";
import { TriangleAlert } from "lucide-react";

export const CategoryColumm = ({
  category,
  transaction,
}: {
  category: any;
  transaction: any;
}) => {
  const { onOpen } = useEditCategory();
  const { onOpen: onOpenEditTransaction } = useEditTransaction();

  const onClick = () => {
    if (category) {
      onOpen(category);
    } else {
      onOpenEditTransaction(transaction);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}

      {category?.name || "Uncategorized"}
    </div>
  );
};
