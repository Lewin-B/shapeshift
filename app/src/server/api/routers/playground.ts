import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

export const playgroundRouter = createTRPCRouter({
  savePlayground: publicProcedure
    .input(
      z.object({
        playgroundId: z.number(),
        figureCode: z.string().min(1, "Code can not be empty"),
        canvasCode: z.string().min(1, "Code can not be empty"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User does not exist",
        });
      }

      const resultStatus = await db.playground.update({
        where: {
          id: input.playgroundId,
          createdById: ctx.session.user.id
        },
        data: {
          canvas: input.canvasCode,
          figure: input.figureCode
        }
      })

      return { data: resultStatus }
    }),
  fetchPlaygrounds: publicProcedure
    .query(async ({ ctx }) => {

      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User does not exist",
        });
      }

      const results = db.playground.findMany({
        where: {
          createdById: ctx.session.user.id
        },
      })

      return { data: results }
    })
});
