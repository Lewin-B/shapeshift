"use server";
import { signIn } from "~/server/auth";

export async function GithubSignIn() {
  await signIn("github", {
    redirectTo: "/profile",
  });
}
