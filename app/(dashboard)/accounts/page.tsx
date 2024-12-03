import { Suspense } from "react";
import { FinancialAccount } from "@prisma/client";

import { getAccount } from "@/lib/actions/account-actions";
import { Loading } from "@/components/loading";
import AccountClient from "./account-client";

export const dynamic = "force-dynamic";

const AccountsPage = async () => {
  const data = await getAccount();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <AccountClient data={data as FinancialAccount[]} />
      </Suspense>
    </>
  );
};

export default AccountsPage;
