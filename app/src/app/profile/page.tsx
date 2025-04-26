import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server"; // use the server‐side entrypoint
import { PlaygroundMenu } from "../_components/profile/playgrounds";

export default async function Page() {
  // 1. Check session on the server
  const session = await auth();

  // 2. If not signed in, kick them to the sign-in page
  if (!session?.user) {
    // make sure your callback URL is encoded!
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("http://localhost:3000/")}`,
    );
  }

  const [playgrounds] = await Promise.all([api.playground.fetchPlaygrounds()]);

  // const mockPlaygrounds = [
  //   {
  //     id: 1,
  //     createdAt: new Date("2025-04-20T10:00:00Z"),
  //     updatedAt: new Date("2025-04-20T10:00:00Z"),
  //     createdById: "user_abc123",
  //     canvas: "<canvas>Mock Canvas 1</canvas>",
  //     figure: "<figure>Mock Figure 1</figure>",
  //   },
  //   {
  //     id: 2,
  //     createdAt: new Date("2025-04-21T14:35:00Z"),
  //     updatedAt: new Date("2025-04-21T15:00:00Z"),
  //     createdById: "user_xyz456",
  //     canvas: "<canvas>Mock Canvas 2</canvas>",
  //     figure: "<figure>Mock Figure 2</figure>",
  //   },
  //   {
  //     id: 3,
  //     createdAt: new Date("2025-04-22T09:15:00Z"),
  //     updatedAt: new Date("2025-04-22T09:20:00Z"),
  //     createdById: "user_def789",
  //     canvas: "<canvas>Mock Canvas 3</canvas>",
  //     figure: "<figure>Mock Figure 3</figure>",
  //   },
  // ];

  return (
    <div className="container mx-auto mt-18 px-4 py-8">
      <PlaygroundMenu
        playgrounds={playgrounds}
        userName={session.user.name?.split(" ")[0] ?? "Anonymous User"}
      />
    </div>
  );
}
