"use server";

import { Transaction } from "@prisma/client";
import { prisma } from "../prisma";
import { getCurrentUser } from "./get-current-user";

export const createTransaction = async ({
  values,
}: {
  values: Partial<Transaction>;
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.transaction.create({
      data: {
        amount: values.amount ?? 1,
        payee: values.payee ?? "",
        date: values.date ?? new Date(),
        categoryId: values.categoryId ?? "",
        accountId: values.accountId ?? "",
        notes: values.notes,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};
