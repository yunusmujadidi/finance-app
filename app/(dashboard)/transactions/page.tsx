import TransactionClient from "./transaction-client";
import { Transaction } from "@prisma/client";
import { getTransactions } from "@/lib/actions/transaction-actions";

const AccountsPage = async () => {
  const data = await getTransactions();

  return (
    <>
      <TransactionClient data={data as Transaction[]} />
    </>
  );
};

export default AccountsPage;
