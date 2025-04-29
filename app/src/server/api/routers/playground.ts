import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

export const playgroundRouter = createTRPCRouter({
  savePlayground: publicProcedure
    .input(
      z.object({
        playgroundId: z.string().optional(),
        name: z.string().min(1, "Name can not be empty"),
        figureCode: z.string().min(1, "Figure code can not be empty"),
        canvasCode: z.string().min(1, "Canvas code can not be empty"),
        // --- add validations for your new settings ---
        depth: z.number(),
        size: z.number(),
        rotateX: z.string(),
        rotateY: z.string(),
        rotateZ: z.string(),
        bounceX: z.string(),
        bounceY: z.string(),
        bounceZ: z.string(),
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

      // build the common data payload
      const data = {
        name: input.name,
        figure: input.figureCode,
        canvas: input.canvasCode,
        // --- include your new settings ---
        depth: input.depth,
        size: input.size,
        rotateX: input.rotateX,
        rotateY: input.rotateY,
        rotateZ: input.rotateZ,
        bounceX: input.bounceX,
        bounceY: input.bounceY,
        bounceZ: input.bounceZ,
      };

      if (input.playgroundId) {
        // update existing record
        return await db.playground.update({
          where: {
            id: input.playgroundId,
            createdById: userId,
          },
          data,
        });
      } else {
        // create new record
        return await db.playground.create({
          data: {
            ...data,
            createdById: userId,
          },
        });
      }
    }),
  fetchPlaygrounds: protectedProcedure.query(async ({ ctx }) => {
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
  fetchPlayground: protectedProcedure
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
  deletePlayground: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "Playground ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be logged in to delete a playground",
        });
      }

      // ensure it exists and belongs to this user
      const existing = await db.playground.findUnique({
        where: { id: input.id },
      });
      if (!existing || existing.createdById !== userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Playground not found",
        });
      }

      // delete and return the old record
      const deleted = await db.playground.delete({
        where: { id: input.id },
      });

      return deleted;
    }),
});
