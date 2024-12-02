import { getCategories } from "@/lib/actions/category-actions";
import CategoryClient from "./category-client";
import { Categories } from "@prisma/client";

const AccountsPage = async () => {
  const data = await getCategories();

  return (
    <>
      <CategoryClient data={data as Categories[]} />
    </>
  );
};

export default AccountsPage;
