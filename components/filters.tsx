import { getAccount } from "@/lib/actions/account-actions";
import { AccountFilter } from "./account-filter";
import { FinancialAccount } from "@prisma/client";
import { DateFilter } from "./date-filter";

export const Filters = async () => {
  const account = await getAccount();
  console.log(account);
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <AccountFilter data={account as Partial<FinancialAccount>[]} />
      <DateFilter />
    </div>
  );
};
