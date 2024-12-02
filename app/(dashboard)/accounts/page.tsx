import { getAccount } from "@/lib/actions/account-actions";
import AccountClient from "./account-client";
import { FinancialAccount } from "@prisma/client";
export const dynamic = "force-dynamic";

const AccountsPage = async () => {
  const data = await getAccount();

  return (
    <>
      <AccountClient data={data as FinancialAccount[]} />
    </>
  );
};

export default AccountsPage;
