import { authoption } from './option';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authoption);
export { handler as GET, handler as POST };
