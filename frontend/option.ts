import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getuserById, login, updateUser } from '@/services/userService';
import NextAuth from 'next-auth';

// Add this type definition at the top of your file
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
  interface User {
    id: string;
  }
}

export const { auth, handler, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const response = await login({
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data?.data;

          if (!user) return null;

          return user;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth',
  },

  events: {
    async linkAccount({ user, account }) {
      const userId = user.id || (account?.providerAccountId as string);
      if (userId) {
        await updateUser(userId, {
          emailVerified: new Date(),
        });
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;
      const existingUser = await getuserById(user.id);
      if (!existingUser || !existingUser?.data?.emailVerified) return false;
      return true;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },

  session: { strategy: 'jwt' },
});
