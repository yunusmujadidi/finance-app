import Link from "next/link";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  href: string;
  isActive: boolean;
  label: string;
}

export const NavButton = ({ href, isActive, label }: NavButtonProps) => {
  return (
    <Link href={href}>
      <Button
        asChild
        size="sm"
        variant="outline"
        className={cn(
          "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
          isActive ? "bg-white/10 text-white" : "bg-transparent"
        )}
      >
        <p className="text-xs">{label}</p>
      </Button>
    </Link>
  );
};
