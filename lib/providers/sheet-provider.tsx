import { Categories, FinancialAccount, Transaction } from "@prisma/client";
import { getAccount } from "../actions/account-actions";
import { getCategories } from "../actions/category-actions";
import { SheetClient } from "./sheet-client";

const SheetProvider = async () => {
  const account = await getAccount();
  const category = await getCategories();

  return (
    <SheetClient
      account={account as FinancialAccount[]}
      category={category as Categories[]}
    />
  );
};

export default SheetProvider;
