import SignInClient from "@/app/(auth)/sign-in/signinclient";
import { getCurrentUser } from "@/lib/actions/get-current-user";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
const SignInPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <SignInClient />;
  }

  redirect("/");
};

export default SignInPage;
