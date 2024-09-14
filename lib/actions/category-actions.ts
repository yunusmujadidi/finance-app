"use server";

import { Categories } from "@prisma/client";
import { prisma } from "../prisma";
import { getCurrentUser } from "./get-current-user";

export const createCategory = async (values: { name: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.categories.create({
      data: {
        name: values.name,
        userId: currentUser.id,
      },
    });
    return { success: true, result };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category" };
  }
};

export const getCategories = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  try {
    const result = await prisma.categories.findMany({
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
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export const bulkDeleteCategories = async (ids: string[]) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  try {
    const result = await prisma.categories.deleteMany({
      where: {
        id: { in: ids },
        userId: currentUser.id,
      },
    });

    return { success: true, deletedCount: result.count };
  } catch (error) {
    console.error("Failed to delete categories:", error);
    return { success: false, error: "Failed to delete categories" };
  }
};

export const updateCategory = async (values: Partial<Categories>) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.categories.update({
      where: {
        id: values.id,
        userId: currentUser.id,
      },
      data: {
        name: values.name,
      },
    });

    return { success: true, updatedData: result.name };
  } catch (error) {
    console.error("Failed to update category", error);
    return { success: false, error: "Failed to update category" };
  }
};

export const deleteCategory = async ({ id }: { id: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.categories.delete({
      where: {
        id: id as string,
        userId: currentUser.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category", error);
    return { success: false, error: "Something went wrong" };
  }
};

export const getCategoryById = async ({ id }: { id: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await prisma.categories.findUnique({
      where: {
        id: id,
        userId: currentUser.id,
      },
    });

    if (!result) {
      return { success: false, error: "Category not found" };
    }

    return result;
  } catch (error) {
    console.error("Failed to fetch category", error);
    return { success: false, error: "Failed to fetch category" };
  }
};
