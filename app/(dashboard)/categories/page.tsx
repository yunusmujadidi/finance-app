import { getCategories } from "@/lib/actions/category-actions";
import CategoryClient from "./category-client";
import { Categories } from "@prisma/client";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export const dynamic = "force-dynamic";

const AccountsPage = async () => {
  const data = await getCategories();

  return (
    <>
      <Suspense
        fallback={
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
        }
      >
        <CategoryClient data={data as Categories[]} />
      </Suspense>
    </>
  );
};

export default AccountsPage;
