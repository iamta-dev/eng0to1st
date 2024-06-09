import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const groupMemorizeSentenceRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(
      z.object({
        categoryId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (ctx.session) {
        return ctx.db.groupMemorizeSentences.findMany({
          where: { categoryMemorizeSentenceId: input.categoryId },
        });
      }
      return ctx.db.memorizeSentences.findMany();
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        categoryId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.groupMemorizeSentences.create({
        data: {
          name: input.name,
          categoryMemorizeSentenceId: input.categoryId,
        },
      });
    }),
});
