"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseNewAccount } from "@/lib/hooks/use-new-account";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { FinancialAccount } from "@prisma/client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AccountClient = ({ data }: { data: FinancialAccount[] }) => {
  const { onOpen } = UseNewAccount();
  const [loading, isLoading] = useState();

  const TableSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[100px] ml-auto" />
      </div>
      <div className="border rounded-lg">
        <div className="border-b">
          <div className="flex p-4">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-6 w-1/4 ml-4" />
            <Skeleton className="h-6 w-1/4 ml-4" />
          </div>
        </div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center p-4">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-1/4 ml-4" />
            <Skeleton className="h-4 w-1/4 ml-4" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Account page</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4 mr-4" /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={data}
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountClient;
