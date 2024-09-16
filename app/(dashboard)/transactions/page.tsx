import { getAccount } from "@/lib/actions/account-actions";
import TransactionClient from "./account-client";
import { Transaction } from "@prisma/client";

const AccountsPage = async () => {
  const data = await getAccount();

  return (
    <>
      <TransactionClient data={data as Transaction[]} />
    </>
  );
};

export default AccountsPage;
