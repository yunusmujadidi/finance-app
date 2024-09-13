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
