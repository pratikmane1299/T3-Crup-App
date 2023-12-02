import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.insert(posts).values({
        name: input.name,
      }).returning({ id: posts.id, name: posts.name });
    }),

  updatePost: publicProcedure
    .input(z.object({ name: z.string().min(1), id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.update(posts).set({ name: input.name }).where(eq(posts.id, input.id)).returning({ id: posts.id, name: posts.name });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() })).
    mutation(async function ({ ctx, input }) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.delete(posts).where(eq(posts.id, input.id)).returning({ id: posts.id });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),

  getAllPost: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({ orderBy: (posts, { desc }) => [desc(posts.createdAt)] });
  }),

});
