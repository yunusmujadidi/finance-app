import { useEditCategory } from "@/lib/hooks/use-edit-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { CategoryForm, FormValues } from "./category-form";
import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/lib/actions/category-actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { Categories } from "@prisma/client";

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useEditCategory();
  const [loading, setLoading] = useState(false);
  const [category, setcategory] = useState<Categories | null>(null);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const router = useRouter();

  useEffect(() => {
    const fetchcategory = async () => {
      if (id) {
        const result = await getCategoryById({ id });
        if (result && "id" in result) {
          setcategory(result);
        }
      }
    };

    fetchcategory();
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const result = await updateCategory({
      name: values.name,
      id: id as string,
    });
    setLoading(false);
    if (result.success) {
      toast.success("category updated successfully");
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
      const result = await deleteCategory({
        id: id as string,
      });
      setLoading(false);
      if (result.success) {
        toast.success("category deleted successfully");
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
            <SheetTitle>Edit category</SheetTitle>
            <SheetDescription>
              Create a new category to track your transactions
            </SheetDescription>
          </SheetHeader>
          <CategoryForm
            onDelete={onDelete}
            id={id}
            onSubmit={onSubmit}
            disabled={loading}
            defaultValues={category ? { name: category.name } : { name: "" }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
