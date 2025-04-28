import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

export const playgroundRouter = createTRPCRouter({
  savePlayground: publicProcedure
    .input(
      z.object({
        playgroundId: z.string().optional(),
        name: z.string().min(1, "Code can not be empty"),
        figureCode: z.string().min(1, "Code can not be empty"),
        canvasCode: z.string().min(1, "Code can not be empty"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User does not exist",
        });
      }

      const data = {
        name: input.name,
        figure: input.figureCode,
        canvas: input.canvasCode,
      };

      if (input.playgroundId) {
        const updated = await db.playground.update({
          where: {
            id: input.playgroundId,
            createdById: userId,
          },
          data,
        });
        return updated;
      } else {
        const created = await db.playground.create({
          data: {
            ...data,
            createdById: userId,
          },
        });
        return created;
      }
    }),
  fetchPlaygrounds: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User does not exist",
      });
    }

    const results = db.playground.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });

    return results;
  }),
  fetchPlayground: publicProcedure
    .input(
      z.object({
        id: z.string().min(1, "id required"),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User does not exist",
        });
      }
      try {
        return await db.playground.findUnique({
          where: {
            id: input.id,
            createdById: ctx.session?.user.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as TRPCError).message,
        });
      }
    }),
});
