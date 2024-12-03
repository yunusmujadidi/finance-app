import { Suspense } from "react";

import TransactionClient from "./transaction-client";
import { Transaction } from "@prisma/client";
import { getTransactions } from "@/lib/actions/transaction-actions";
import { Loading } from "@/components/loading";

export const dynamic = "force-dynamic";

const AccountsPage = async () => {
  const data = await getTransactions();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <TransactionClient data={data as Transaction[]} />
      </Suspense>
    </>
  );
};

export default AccountsPage;
