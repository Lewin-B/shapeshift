import { SignInButton } from "../_components/login/sign-in";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect("/profile");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#766251] via-[#262013] to-[#030303] p-4">
      <div className="w-full max-w-md rounded-lg border border-[#F3B518]/20 bg-black p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-[#F3B518]">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to continue to your account</p>
        </div>

        <div className="flex flex-col items-center">
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
