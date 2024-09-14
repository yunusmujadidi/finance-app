import { getAccount } from "@/lib/actions/account-actions";
import AccountClient from "./account-client";
import { FinancialAccount } from "@prisma/client";

const AccountsPage = async () => {
  const data = await getAccount();
  console.log(data);
  return (
    <>
      <AccountClient data={data as FinancialAccount[]} />
    </>
  );
};

export default AccountsPage;
