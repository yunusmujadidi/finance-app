"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "./get-current-user";

export const createAccount = async (values: { name: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.financialAccount.create({
      data: {
        name: values.name,
        userId: currentUser.id,
      },
    });
    return { success: true, result };
  } catch (error) {
    console.error("Failed to create account:", error);
    return { success: false, error: "Failed to create account" };
  }
};

export const getAccount = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  try {
    const result = await prisma.financialAccount.findMany({
      where: {
        userId: currentUser.id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return result;
  } catch (error) {
    console.error("Failed to fetch accounts:", error);
    throw new Error("Failed to fetch accounts");
  }
};

export const bulkDeleteAccounts = async (ids: string[]) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  try {
    const result = await prisma.financialAccount.deleteMany({
      where: {
        id: { in: ids },
        userId: currentUser.id,
      },
    });

    return { success: true, deletedCount: result.count };
  } catch (error) {
    console.error("Failed to delete accounts:", error);
    return { success: false, error: "Failed to delete accounts" };
  }
};
