import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@repo/db";
import authConfig from "./auth.config";
import { getUserById } from "./dboper/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth",
  },

  session: {
    strategy: "jwt",
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { account: true },
        });

        if (existingUser) {
          const alreadyLinked = existingUser.account.some(
            (acc) => acc.provider === "google"
          );

          if (!alreadyLinked) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: "google",
                providerAccountId: account.providerAccountId!,
                type: account.type!,
                access_token: account.access_token,
                id_token: account.id_token,
                scope: account.scope,
                token_type: account.token_type,
              },
            });
          }
        }
        return true;
      }

      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id!);
        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },

  ...authConfig,
});
