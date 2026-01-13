import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";
import { Toaster } from "@/ui/components/sonner";
import { SessionProvider } from "next-auth/react";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KEYTYPE",
  description: "Practice typing with KEYTYPE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" className="h-full overflow-hidden">
        <body
          className={`${geistMono.className} antialiased h-full bg-linear-to-b from-neutral-900 to-black text-neutral-400 overflow-hidden`}
        >
          <div className="h-full overflow-y-auto no-scrollbar">
            <Header />
            {children}
          </div>

          <Toaster position="top-center" richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
