"use server";

import { revalidatePath } from "next/cache";

export const handleCache = async () => {
  revalidatePath("/categories");
  revalidatePath("/transactions");
  revalidatePath("/accounts");
  revalidatePath("/");
};
