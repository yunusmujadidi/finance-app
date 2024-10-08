import SignInClient from "@/app/(auth)/sign-in/signinclient";
import { getCurrentUser } from "@/lib/actions/get-current-user";
import SignOutButton from "./sign-out";

const SignInPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <SignInClient />;
  }

  return (
    <div>
      <SignOutButton />
      {user.id}
    </div>
  );
};

export default SignInPage;
