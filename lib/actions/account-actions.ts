"use server";

import { FinancialAccount } from "@prisma/client";
import { prisma } from "../prisma";
import { getCurrentUser } from "./get-current-user";
import { unstable_cache } from "next/cache";
import { revalidatePath } from "next/cache";

export const createAccount = async (values: { name: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  try {
    const result = await prisma.financialAccount.create({
      data: {
        name: values.name,
        userId: currentUser.id,
      },
    });
    revalidatePath("/accounts");
    revalidatePath("/transactions");
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

  return unstable_cache(
    async () => {
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
    },
    ["accounts-list"],
    { tags: ["accounts"], revalidate: 3600 }
  )();
};

export const bulkDeleteAccounts = async (ids: string[]) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }
  try {
    const result = await prisma.financialAccount.deleteMany({
      where: {
        id: { in: ids },
        userId: currentUser.id,
      },
    });
    revalidatePath("/accounts");
    return { success: true, deletedCount: result.count };
  } catch (error) {
    console.error("Failed to delete accounts:", error);
    return { success: false, error: "Failed to delete accounts" };
  }
};

export const updateAccount = async (values: Partial<FinancialAccount>) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.financialAccount.update({
      where: {
        id: values.id,
        userId: currentUser.id,
      },
      data: {
        name: values.name,
      },
    });
    revalidatePath("/accounts");
    revalidatePath("/transactions");
    return { success: true, updatedData: result.name };
  } catch (error) {
    console.error("Failed to update account", error);
    return { success: false, error: "Failed to update account" };
  }
};

export const deleteAccount = async ({ id }: { id: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.financialAccount.delete({
      where: {
        id: id as string,
        userId: currentUser.id,
      },
    });
    revalidatePath("/accounts");
    revalidatePath("/transactions");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete account", error);
    return { success: false, error: "Something went wrong" };
  }
};

export const getAccountById = async ({ id }: { id: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  return unstable_cache(
    async () => {
      try {
        const result = await prisma.financialAccount.findUnique({
          where: {
            id: id,
            userId: currentUser.id,
          },
        });

        if (!result) {
          return { success: false, error: "Account not found" };
        }

        return result;
      } catch (error) {
        console.error("Failed to fetch account", error);
        return { success: false, error: "Failed to fetch account" };
      }
    },
    [`account-${id}`],
    { tags: ["accounts"], revalidate: 3600 }
  )();
};
