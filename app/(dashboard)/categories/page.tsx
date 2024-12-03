import { Suspense } from "react";
import { Categories } from "@prisma/client";

import { getCategories } from "@/lib/actions/category-actions";
import { Loading } from "@/components/loading";
import CategoryClient from "./category-client";

export const dynamic = "force-dynamic";

const AccountsPage = async () => {
  const data = await getCategories();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <CategoryClient data={data as Categories[]} />
      </Suspense>
    </>
  );
};

export default AccountsPage;
