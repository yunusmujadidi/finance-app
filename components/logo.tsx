import { WalletMinimal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        {/* <Image src="/logo.svg" alt="logo" height={28} width={28} /> */}
        <WalletMinimal className="size-7 text-slate-100" />

        <p className="text-2xl font-semibold text-white ml-2.5 ">Finance </p>
      </div>
    </Link>
  );
};
