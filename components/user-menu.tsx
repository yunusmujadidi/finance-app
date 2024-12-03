"use client";
import { Loader2, LogIn, LogOut, UserCircle, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { handleCache } from "@/lib/actions/handle-cache";

export const UserMenu = ({ currentUser }: { currentUser?: User }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="items-center justify-center">
          {currentUser && currentUser.image ? (
            <Image
              width={32}
              height={32}
              className="rounded-full object-cover hover:opacity-80 transition-opacity select-none"
              alt={`${currentUser.name || "User"}'s avatar`}
              src={currentUser.image}
            />
          ) : (
            <UserCircle className="size-9 text-slate-100 stroke-[1.5]" />
          )}
        </Avatar>
      </DropdownMenuTrigger>

      {currentUser ? (
        <DropdownMenuContent align="end" className="w-40 mx-5">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              handleCache();
              signOut({ callbackUrl: "/" });
            }}
          >
            <LogOut className="mr-2 size-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-40 mx-5">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/sign-in")}>
            <LogIn className="mr-2 size-4" />
            <span>Log In</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => router.push("/sign-up")}>
            <UserPlus className="mr-2 size-4" />
            <span>Sign Up</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
