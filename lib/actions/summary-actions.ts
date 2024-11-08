"use server";

import { differenceInDays, parse, subDays } from "date-fns";
import { getCurrentUser } from "./get-current-user";
import { prisma } from "../prisma";
import { calculatePercentageChange, fillMissingDays } from "../utils";
import { Summary } from "@/components/data-charts";

type SummaryParams = {
  from?: string;
  to?: string;
  accountId?: string;
};

export const getSummary = async (params?: SummaryParams) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      // Default empty summary object when user is not found
      return {
        remainingAmount: 0,
        remainingChange: 0,
        incomeAmount: 0,
        incomeChange: 0,
        expensesAmount: 0,
        expenseChange: 0,
        categories: [],
        days: [],
      } as Summary;
    }
    // Default date range if no params provided
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    // Use optional chaining to safely access potentially undefined params
    const startDate = params?.from
      ? parse(params.from, "yyyy-MM-dd", new Date())
      : defaultFrom;
    const endDate = params?.to
      ? parse(params.to, "yyyy-MM-dd", new Date())
      : defaultTo;

    // Validate date range
    if (startDate > endDate) {
      throw new Error("Start date cannot be after end date");
    }

    const periodLength = differenceInDays(endDate, startDate) + 1;
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    const getFinancialData = async (startDate: Date, endDate: Date) => {
      const incomeTransactions = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          account: {
            userId: currentUser.id,
          },
          ...(params?.accountId && { accountId: params.accountId }),
          date: {
            gte: startDate,
            lte: endDate,
          },
          amount: {
            gte: 0, // Only positive transactions
          },
        },
      });

      const expenseTransactions = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          account: {
            userId: currentUser.id,
          },
          ...(params?.accountId && { accountId: params.accountId }),
          date: {
            gte: startDate,
            lte: endDate,
          },
          amount: {
            lt: 0, // Only negative transactions
          },
        },
      });

      const income = incomeTransactions._sum.amount ?? 0;
      const expenses = expenseTransactions._sum.amount ?? 0;

      return {
        income,
        expenses,
        remaining: income + expenses, // Sum of income and expenses gives the net amount
      };
    };

    const currentPeriod = await getFinancialData(startDate, endDate);
    const lastPeriod = await getFinancialData(lastPeriodStart, lastPeriodEnd);

    const categoryData = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        account: {
          userId: currentUser.id,
        },
        ...(params?.accountId && { accountId: params.accountId }),
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

    // Process top categories
    const topCategories = categoryData.slice(0, 3).map((category) => ({
      name: category.categoryId ?? "Unknown",
      value: Math.abs(category._sum.amount ?? 0),
    }));

    // Handle other categories
    const otherCategories = categoryData.slice(3);
    const otherSum = otherCategories.reduce(
      (sum, current) => sum + Math.abs(current._sum.amount ?? 0),
      0
    );

    const finalCategories = [
      ...topCategories,
      ...(otherCategories.length > 0
        ? [{ name: "Other", value: otherSum }]
        : []),
    ];

    // Get daily transactions
    const activeDays = await prisma.transaction.groupBy({
      by: ["date"],
      where: {
        account: {
          userId: currentUser.id,
        },
        ...(params?.accountId && { accountId: params.accountId }),
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
      remainingAmount: currentPeriod.remaining,
      remainingChange: calculatePercentageChange(
        currentPeriod.remaining,
        lastPeriod.remaining
      ),
      incomeAmount: currentPeriod.income,
      incomeChange: calculatePercentageChange(
        currentPeriod.income,
        lastPeriod.income
      ),
      expensesAmount: currentPeriod.expenses,
      expenseChange: calculatePercentageChange(
        currentPeriod.expenses,
        lastPeriod.expenses
      ),
      categories: finalCategories,
      days,
    };
  } catch (error) {
    console.error("Error in getSummary:", error);
    throw error;
  }
};
