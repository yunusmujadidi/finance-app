import SignInClient from "@/app/signin/signinclient";
import { getCurrentUser } from "@/lib/getCurrentUser";
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
