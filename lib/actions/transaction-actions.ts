"use server";

import { Transaction } from "@prisma/client";
import { prisma } from "../prisma";
import { getCurrentUser } from "./get-current-user";
import { unstable_cache } from "next/cache";
import { revalidatePath } from "next/cache";

//TODO: add date and account filters
// TODO: cache this transactions idk why it doesnt work :(

export const createTransaction = async ({
  values,
}: {
  values: Partial<Transaction>;
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  const amount = values.amount ?? 1;
  if (amount < -2147483648 || amount > 2147483647) {
    throw new Error(
      "Amount value is out of range for a 32-bit signed integer."
    );
  }
  try {
    const result = await prisma.transaction.create({
      data: {
        amount: values.amount ?? 1,
        payee: values.payee ?? "",
        date: values.date ?? new Date(),
        categoryId: values.categoryId ?? null,
        accountId: values.accountId ?? "",
        notes: values.notes,
      },
    });
    revalidatePath("/transactions");
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getTransactions = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  return unstable_cache(
    async () => {
      try {
        const result = await prisma.transaction.findMany({
          where: {
            account: {
              userId: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            account: true,
            category: true,
          },
        });

        return result;
      } catch (error) {
        console.error("Something went wrong:", error);
        return [];
      }
    },
    ["transactions-list"],
    { tags: ["transactions"], revalidate: 3600 }
  )();
};

export const deleteTransaction = async ({ id }: { id: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  try {
    const result = await prisma.transaction.delete({
      where: {
        id: id as string,
      },
    });
    revalidatePath("/transactions");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to delete transaction" };
  }
};

export const deleteBulkTransactions = async (selectedIds: string[]) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  try {
    const result = await prisma.transaction.deleteMany({
      where: {
        id: { in: selectedIds },
      },
    });

    return {
      success: true,
      message: `Success delete ${result.count} transactions`,
      deletedCount: result.count,
    };
  } catch (error) {
    return { success: false, message: "Something went wrong: ", error };
  }
};

export const updateTransactions = async (values: Partial<Transaction>) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  try {
    const result = await prisma.transaction.update({
      where: {
        id: values.id,
      },
      data: {
        amount: values.amount,
        payee: values.payee,
        date: values.date,
        categoryId: values.categoryId,
        accountId: values.accountId,
        notes: values.notes,
      },
    });
    revalidatePath("/transactions");
    return {
      success: true,
      message: "Success updated the transaction",
      updatedData: result,
    };
  } catch (error) {
    return { success: false, message: "Something went wrong: ", error };
  }
};

export const bulkCreateTransactions = async (
  values: Partial<Transaction>[]
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const formattedData = values.map((transaction) => ({
      amount: transaction.amount
        ? parseInt(transaction.amount.toString(), 10)
        : 0,
      payee: transaction.payee ?? "",
      date: transaction.date
        ? new Date(transaction.date).toISOString()
        : new Date().toISOString(),
      categoryId: transaction.categoryId ?? null,
      accountId: transaction.accountId ?? "",
      notes: transaction.notes ?? null,
    }));

    const result = await prisma.transaction.createMany({
      data: formattedData,
    });

    return { success: true, createdCount: result.count, result };
  } catch (error) {
    console.error("Failed to create transactions", error);
    return { success: false, error: "Something went wrong" };
  }
};
