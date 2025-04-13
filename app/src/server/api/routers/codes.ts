import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";

export const codeRouter = {
    createCode: protectedProcedure
        .input(
            z.object({
                figureFile: z.string().optional(),
                canvasFile: z.string().optional(),
                appFile: z.string().optional(),
                appCssFile: z.string().optional(),
            })
        )

        .mutation(async ({ ctx, input }) => {
            const newCode = await ctx.db.code.create({
                data: {
                    userId: ctx.session.user.id,
                    figureFile: input.figureFile,
                    canvasFile: input.canvasFile,
                    appFile: input.appFile,
                    appCssFile: input.appCssFile,
                },
            });
            return newCode;
        }),

    updateCode: protectedProcedure
        .input(
            z.object({
                codeId: z.string(),
                figureFile: z.string().optional(),
                canvasFile: z.string().optional(),
                appFile: z.string().optional(),
                appCssFile: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existingCode = await ctx.db.code.findUnique({
                where: { id: input.codeId }
            });

            if (!existingCode || existingCode.userId !== ctx.session.user.id) {
                throw new TRPCError({
                  code: "FORBIDDEN",
                  message: "You are not allowed to update this code snippet.",
                });
            }

            const updatedCode = await ctx.db.code.update({
                where: { id: input.codeId },
                data: {
                  figureFile: input.figureFile,
                  canvasFile: input.canvasFile,
                  appFile: input.appFile,
                  appCssFile: input.appCssFile,
                },
              });
        
              return updatedCode;
        }),

    getCode: protectedProcedure
        .query(async ({ ctx }) => {
        // Get the most recently updated code snippet for this user
        const snippet = await ctx.db.code.findFirst({
            where: {
            userId: ctx.session.user.id,
            },
            orderBy: {
            createdAt: 'desc', // Use createdAt instead of updatedAt
            },
        });
        
        // Return the snippet or null if none exists
        return snippet;
        }),

    getCodes: protectedProcedure
        .query(async ({ ctx }) => {
        // Get all code snippets for this user
        const snippets = await ctx.db.code.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          orderBy: {
            createdAt: 'desc', // Keep them sorted by creation date (newest first)
          },
        });
        
        // Return the array of snippets (or empty array if none exist)
        return snippets;
      }),

};