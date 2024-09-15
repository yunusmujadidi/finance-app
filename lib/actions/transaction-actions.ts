import { Transaction } from "@prisma/client";
import { prisma } from "../prisma";
import { getCurrentUser } from "./get-current-user";

export const createTransaction = async (data: Transaction) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        account: {
          connect: {
            id: data.accountId,
            userId: currentUser.id,
          },
        },
        category: data.categoryId
          ? {
              connect: {
                id: data.categoryId,
                userId: currentUser.id,
              },
            }
          : undefined,
      },
    });
    return transaction;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Failed to create transaction");
  }
};

export const getTransactions = async (accountId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        accountId,
        account: {
          userId: currentUser.id,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};

export const updateTransaction = async (
  id: string,
  data: {
    amount?: number;
    payee?: string;
    notes?: string;
    date?: Date;
    categoryId?: string;
  }
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const transaction = await prisma.transaction.update({
      where: {
        id,
        account: {
          userId: currentUser.id,
        },
      },
      data: {
        ...data,
        categoryId: data.categoryId,
        category: data.categoryId
          ? {
              connect: {
                id: data.categoryId,
                userId: currentUser.id,
              },
            }
          : undefined,
      },
    });
    return transaction;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
  }
};

export const deleteTransaction = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.transaction.delete({
      where: {
        id,
        account: {
          userId: currentUser.id,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Failed to delete transaction");
  }
};
