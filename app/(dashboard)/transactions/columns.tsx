"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ActionsTable } from "./table-actions";
import { formatDate } from "@/lib/format-date";
import { Transaction } from "@prisma/client";
import { AccountColumn } from "./account-column";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { CategoryColumm } from "./category-column";

// Define the Transaction type based on your data structure

export const columns: ColumnDef<
  Transaction & { account: { name: string }; category: { name: string } }
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatDate(row.original.date.toString()),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium ${
            row.original.amount < 0
              ? "bg-red-100 text-red-500"
              : "bg-blue-100 text-blue-500"
          }`}
        >
          {formatCurrency(row.original.amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "payee",
    header: "Recipient",
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => (
      <CategoryColumm
        transaction={row.original}
        category={row.original.category}
      />
    ),
  },
  {
    accessorKey: "account.name",
    header: "Account",
    cell: ({ row }) => <AccountColumn account={row.original.account} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsTable data={row.original} />,
  },
];
