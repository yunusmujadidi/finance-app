"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";

import { NavButton } from "@/components/navbutton";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

// TODO: add settings page

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },

  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  // {
  //   href: "/settings",
  //   label: "Settings",
  // },
];
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none outline-none text-white focus:bg-white/30 transition focus-visible:ring-offset-0 focus-visible:ring-transparent"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2 ">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((item) => (
        <NavButton
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  );
};
