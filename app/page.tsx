import { signIn } from "@/auth";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    );
  }
  return (
    <>
      <h1 className="text-4xl text-teal-500">{user.id}</h1>
    </>
  );
}
