"use client";

import { Button } from "~/components/ui/button";
import { GithubSignIn } from "../nav/server/signin";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const SignInButton = () => {
  return (
    <Button
      size="lg"
      onClick={GithubSignIn}
      className="bg-black text-[#FFD874] opacity-100"
    >
      Sign in with <GitHubLogoIcon className="ml-1" />
    </Button>
  );
};
