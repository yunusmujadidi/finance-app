import { Categories, FinancialAccount } from "@prisma/client";
import { getAccount } from "../actions/account-actions";
import { getCategories } from "../actions/category-actions";
import { SheetClient } from "./sheet-client";

const SheetProvider = async () => {
  const account = await getAccount();
  const category = await getCategories();
  if (account) {
    console.log("we have account:", account);
  } else {
    console.log("no account");
  }
  return (
    <SheetClient
      account={account as FinancialAccount[]}
      category={category as Categories[]}
    />
  );
};

export default SheetProvider;
