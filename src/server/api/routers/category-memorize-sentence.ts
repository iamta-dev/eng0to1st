import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoryMemorizeSentenceRouter = createTRPCRouter({
  getMany: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session) {
      return ctx.db.categoryMemorizeSentences.findMany({
        where: { userId: ctx.session.user.id },
      });
    }
    return ctx.db.memorizeSentences.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryMemorizeSentences.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
});
