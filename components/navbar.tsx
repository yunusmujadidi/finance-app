import { Logo } from "@/components/logo";
import { Navigation } from "@/components/navigation";
import { UserMenu } from "./user-menu";
import { getCurrentUser } from "@/lib/get-current-user";
import { NavbarText } from "./navbar-text";

export const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <Logo />
            <Navigation />
          </div>
          <UserMenu currentUser={currentUser} />
        </div>
        <NavbarText name={currentUser?.name ?? ""} />
      </div>
    </div>
  );
};
