import { getAccount } from "@/lib/actions/account-actions";
import AccountClient from "./account-client";
import { FinancialAccount } from "@prisma/client";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
export const dynamic = "force-dynamic";

const AccountsPage = async () => {
  const data = await getAccount();

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
        <AccountClient data={data as FinancialAccount[]} />
      </Suspense>
    </>
  );
};

export default AccountsPage;
