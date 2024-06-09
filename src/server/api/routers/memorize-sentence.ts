import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const memorizeSentenceRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(
      z.object({
        categoryId: z.number().nullable(),
        skip: z.number().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.categoryId) {
        return ctx.db.memorizeSentences.findMany({
          where: { categoryMemorizeSentenceId: input.categoryId },
          skip: input.skip ?? 0,
          take: 10,
        });
      }
      return ctx.db.memorizeSentences.findMany({
        skip: input.skip || 0,
        take: 10,
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        textTH: z.string().min(1),
        textEN: z.string().min(1),
        categoryId: z.number(),
        groupId: z.number().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.memorizeSentences.create({
        data: {
          textTH: input.textTH,
          textEN: input.textEN,
          categoryMemorizeSentenceId: input.categoryId,
          groupMemorizeSentenceId: input.groupId,
          userId: ctx.session.user.id,
        },
      });
    }),
});
