import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server"; // use the server‐side entrypoint
import { PlaygroundMenu } from "../_components/profile/playgrounds";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const [playgrounds] = await Promise.all([api.playground.fetchPlaygrounds()]);

  return (
    <div className="container mx-auto mt-18 px-4 py-8">
      <PlaygroundMenu
        playgrounds={playgrounds}
        userName={session.user.name?.split(" ")[0] ?? "Anonymous User"}
      />
    </div>
  );
}
