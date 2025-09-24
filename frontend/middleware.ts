import { NextResponse } from "next/server.js";

// 🚨 temporary bypass middleware just for testing
export default function middleware(req: any) {
  try {
    // just let everything pass through
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware crashed:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
  runtime: "nodejs",
};
