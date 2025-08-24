import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authoption } from './app/api/auth/[...nextauth]/option';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from './constants';

const { auth } = NextAuth(authoption);

export default auth((req: any) => {
  const isLoggedIn = !req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (!isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/auth', '/api/auth/:path*'],
};
