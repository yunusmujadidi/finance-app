"use server";

import { auth } from "@/auth";
import { User } from "@prisma/client";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return null;
    }
    return session.user as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
});
