import { useNewCategory } from "@/modules/category/hooks/use-new-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { CategoryForm, FormValues } from "./category-form";
import { createCategory } from "@/lib/actions/category-actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const result = await createCategory({
      name: values.name,
    });
    setLoading(false);
    if (result.success) {
      toast.success("category created successfully");
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
          <SheetTitle>New category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={loading} />
      </SheetContent>
    </Sheet>
  );
};
