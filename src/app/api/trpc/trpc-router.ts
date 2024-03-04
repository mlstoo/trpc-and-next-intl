import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getUsers: t.procedure.query(async ({ ctx }) => {
    return await prisma.userData.findMany();
  }),
  translate: t.router({
    getMessages: t.procedure.input(z.object({ locale: z.string() })).query(async ({ input }) => {
      return await prisma.localeTranslation.findMany({
        where: { localeCode: input.locale },
      });
    }),
  })
});

export type AppRouter = typeof appRouter;
