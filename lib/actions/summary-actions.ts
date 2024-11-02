"use server";

import { differenceInDays, parse, subDays } from "date-fns";
import { getCurrentUser } from "./get-current-user";
import { prisma } from "../prisma";
import { calculatePercentageChange, fillMissingDays } from "../utils";

export const getSummary = async ({
  from,
  to,
  accountId,
}: {
  from?: string;
  to?: string;
  accountId?: string;
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorize");
  }

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
  const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

  const periodLength = differenceInDays(endDate, startDate) + 1;
  const lastPeriodStart = subDays(startDate, periodLength);
  const lastPeriodEnd = subDays(endDate, periodLength);

  const getFinancialData = async (startDate: Date, endDate: Date) => {
    const transactions = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        account: {
          userId: currentUser.id,
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const income =
      (transactions._sum.amount ?? 0) >= 0 ? transactions._sum.amount ?? 0 : 0;
    const expenses =
      (transactions._sum.amount ?? 0) < 0 ? transactions._sum.amount ?? 0 : 0;
    const remaining = transactions._sum.amount ?? 0;

    return { income, expenses, remaining };
  };

  const currentPeriod = await getFinancialData(startDate, endDate);
  const lastPeriod = await getFinancialData(lastPeriodStart, lastPeriodEnd);

  const incomeChange = calculatePercentageChange(
    currentPeriod.income,
    lastPeriod.income
  );
  const expenseChange = calculatePercentageChange(
    currentPeriod.expenses,
    lastPeriod.expenses
  );
  const remainingChange = calculatePercentageChange(
    currentPeriod.remaining ?? 0,
    lastPeriod.remaining ?? 0
  );

  const categoryData = await prisma.transaction.groupBy({
    by: ["categoryId"],
    where: {
      account: {
        userId: currentUser.id,
      },
      amount: {
        lt: 0,
      },
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      amount: true,
    },
  });
  const topCategories = categoryData.slice(0, 3).map((category) => ({
    name: category.categoryId,
    value: Math.abs(category._sum.amount ?? 0),
  }));

  const otherCategories = categoryData.slice(3);
  const otherSum = otherCategories.reduce(
    (sum, current) => sum + Math.abs(current._sum.amount ?? 0),
    0
  );

  const finalCategories = [
    ...topCategories,
    ...(otherCategories.length > 0 ? [{ name: "Other", value: otherSum }] : []),
  ];

  const activeDays = await prisma.transaction.groupBy({
    by: ["date"],
    where: {
      account: {
        userId: currentUser.id,
      },
      accountId: accountId || undefined,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const formattedActiveDays = activeDays.map((day) => ({
    date: day.date,
    income: (day._sum.amount ?? 0) >= 0 ? day._sum.amount ?? 0 : 0,
    expenses: (day._sum.amount ?? 0) < 0 ? day._sum.amount ?? 0 : 0,
  }));

  const days = fillMissingDays(formattedActiveDays, startDate, endDate);

  return {
    data: {
      remainingAmount: currentPeriod.remaining,
      remainingChange,
      incomeAmount: currentPeriod.income,
      incomeChange,
      expensesAmount: currentPeriod.expenses,
      expenseChange,
      categories: finalCategories,
      days,
    },
  };
};
