"use client";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewCategory } from "@/modules/category/hooks/use-new-category";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Categories } from "@prisma/client";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { bulkDeleteCategories } from "@/lib/actions/category-actions";
import { useRouter } from "next/navigation";

const CategoryClient = ({ data }: { data: Categories[] }) => {
  const [isPending, startTransition] = useTransition();
  const { onOpen } = useNewCategory();

  const router = useRouter();

  const handleBulkDelete = async (selectedIds: string[]) => {
    startTransition(async () => {
      try {
        const result = await bulkDeleteCategories(selectedIds);

        toast.success(`Successfully deleted ${result.deletedCount} categories`);
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete categories");
        console.error("Bulk delete error:", error);
      }
    });
  };

  if (isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Category page</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4 mr-4" /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onUpdate={() => {}}
            onDelete={handleBulkDelete}
            filterKey="name"
            columns={columns}
            data={data}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryClient;
