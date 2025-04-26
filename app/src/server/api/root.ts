import { svgRouter } from "~/server/api/routers/svg";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { playgroundRouter } from "./routers/playground";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  svg: svgRouter,
  playground: playgroundRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
