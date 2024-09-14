"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseNewAccount } from "@/lib/hooks/use-new-account";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/data-table";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "3f9a8e7b",
    amount: 75,
    status: "success",
    email: "john@example.com",
  },
  {
    id: "2c1d6f4e",
    amount: 200,
    status: "failed",
    email: "sarah@gmail.com",
  },
  {
    id: "5e7b9a3c",
    amount: 150,
    status: "pending",
    email: "alex@example.com",
  },
  {
    id: "1a2b3c4d",
    amount: 300,
    status: "processing",
    email: "emma@gmail.com",
  },
  {
    id: "9f8e7d6c",
    amount: 50,
    status: "success",
    email: "michael@example.com",
  },
  {
    id: "5a4b3c2d",
    amount: 175,
    status: "pending",
    email: "olivia@gmail.com",
  },
  {
    id: "1e2f3g4h",
    amount: 225,
    status: "processing",
    email: "daniel@example.com",
  },
  {
    id: "8i7h6g5f",
    amount: 80,
    status: "failed",
    email: "sophia@gmail.com",
  },
  {
    id: "4j5k6l7m",
    amount: 120,
    status: "success",
    email: "william@example.com",
  },
  {
    id: "9n8m7l6k",
    amount: 90,
    status: "pending",
    email: "ava@gmail.com",
  },
  {
    id: "2o3p4q5r",
    amount: 250,
    status: "processing",
    email: "james@example.com",
  },
  {
    id: "6s7t8u9v",
    amount: 180,
    status: "success",
    email: "mia@gmail.com",
  },
  {
    id: "1w2x3y4z",
    amount: 140,
    status: "failed",
    email: "benjamin@example.com",
  },
  {
    id: "5a6b7c8d",
    amount: 110,
    status: "pending",
    email: "charlotte@gmail.com",
  },
  {
    id: "9e8f7g6h",
    amount: 195,
    status: "processing",
    email: "ethan@example.com",
  },
  {
    id: "4i3j2k1l",
    amount: 70,
    status: "success",
    email: "amelia@gmail.com",
  },
  {
    id: "7m6n5o4p",
    amount: 160,
    status: "pending",
    email: "logan@example.com",
  },
  {
    id: "2q1r0s9t",
    amount: 210,
    status: "processing",
    email: "harper@gmail.com",
  },
  {
    id: "8u7v6w5x",
    amount: 95,
    status: "failed",
    email: "lucas@example.com",
  },
  {
    id: "3y2z1a0b",
    amount: 130,
    status: "success",
    email: "evelyn@gmail.com",
  },
  {
    id: "9c8d7e6f",
    amount: 85,
    status: "pending",
    email: "jackson@example.com",
  },
  {
    id: "5g4h3i2j",
    amount: 240,
    status: "processing",
    email: "abigail@gmail.com",
  },
  {
    id: "1k0l9m8n",
    amount: 105,
    status: "success",
    email: "sebastian@example.com",
  },
  {
    id: "7o6p5q4r",
    amount: 170,
    status: "failed",
    email: "emily@gmail.com",
  },
  {
    id: "3s2t1u0v",
    amount: 55,
    status: "pending",
    email: "henry@example.com",
  },
  {
    id: "9w8x7y6z",
    amount: 190,
    status: "processing",
    email: "scarlett@gmail.com",
  },
  {
    id: "5a4b3c2d",
    amount: 115,
    status: "success",
    email: "jack@example.com",
  },
  {
    id: "1e0f9g8h",
    amount: 280,
    status: "pending",
    email: "madison@gmail.com",
  },
  {
    id: "7i6j5k4l",
    amount: 65,
    status: "processing",
    email: "aiden@example.com",
  },
  {
    id: "3m2n1o0p",
    amount: 220,
    status: "failed",
    email: "chloe@gmail.com",
  },
  {
    id: "9q8r7s6t",
    amount: 135,
    status: "success",
    email: "owen@example.com",
  },
  {
    id: "5u4v3w2x",
    amount: 205,
    status: "pending",
    email: "zoey@gmail.com",
  },
  {
    id: "1y0z9a8b",
    amount: 60,
    status: "processing",
    email: "gabriel@example.com",
  },
  {
    id: "7c6d5e4f",
    amount: 155,
    status: "success",
    email: "penelope@gmail.com",
  },
  {
    id: "3g2h1i0j",
    amount: 230,
    status: "failed",
    email: "liam@example.com",
  },
  {
    id: "9k8l7m6n",
    amount: 45,
    status: "pending",
    email: "aria@gmail.com",
  },
  {
    id: "5o4p3q2r",
    amount: 185,
    status: "processing",
    email: "ryan@example.com",
  },
  {
    id: "1s0t9u8v",
    amount: 270,
    status: "success",
    email: "layla@gmail.com",
  },
  {
    id: "7w6x5y4z",
    amount: 40,
    status: "failed",
    email: "isaac@example.com",
  },
  {
    id: "3a2b1c0d",
    amount: 165,
    status: "pending",
    email: "audrey@gmail.com",
  },
  {
    id: "9e8f7g6h",
    amount: 215,
    status: "processing",
    email: "christopher@example.com",
  },
  {
    id: "5i4j3k2l",
    amount: 145,
    status: "success",
    email: "leah@gmail.com",
  },
  {
    id: "1m0n9o8p",
    amount: 235,
    status: "failed",
    email: "josiah@example.com",
  },
  {
    id: "7q6r5s4t",
    amount: 35,
    status: "pending",
    email: "anna@gmail.com",
  },
  {
    id: "3u2v1w0x",
    amount: 255,
    status: "processing",
    email: "julian@example.com",
  },
  {
    id: "9y8z7a6b",
    amount: 30,
    status: "success",
    email: "nora@gmail.com",
  },
];

const AccountsPage = () => {
  const { onOpen } = UseNewAccount();
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
            filterKey="email"
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

export default AccountsPage;
