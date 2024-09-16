import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SheetClient } from "@/lib/providers/sheet-client";
import { Toaster } from "sonner";
import SheetProvider from "@/lib/providers/sheet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SheetProvider />
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
