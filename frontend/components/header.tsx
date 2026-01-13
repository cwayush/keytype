"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { GhostIcon, LogOut, Menu } from "lucide-react";

import { Button } from "@/ui/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/components/sheet";
import { NAVLINKS } from "@/constants";

export function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="max-w-6xl  mx-auto flex items-center justify-between px-2 py-4">
        <Link
          href="/"
          className="relative group inline-flex items-center px-4 py-2 rounded-xl transition-all duration-500"
        >
          <span className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-500  to-emerald-500 opacity-0 group-hover:opacity-40 blur-2xl group-hover:scale-400 transition-all duration-500" />
          <span className="relative z-10 flex items-center gap-2 font-extrabold md:text-3xl text-2xl tracking-wide">
            <img src="/kt-logo.svg" alt="KEYTYPE logo" className="w-10 h-10" />

            <span>
              <span className="text-white">key</span>
              <span className="bg-linear-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent">
                Type
              </span>
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-3">
          {NAVLINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 text-neutral-200 hover:text-blue-500 transition"
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          ))}

          {session && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="hover:bg-linear-to-r from-blue-800 to-emerald-800"
            >
              <LogOut className="size-5" />
            </Button>
          )}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Menu className="size-7 md:hidden" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[250px] bg-neutral-900 border-neutral-800 p-0"
          >
            <div className="flex flex-col gap-6 px-6 py-8 mt-8 h-full">
              <nav className="flex flex-col gap-2">
                {NAVLINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-2 py-3 rounded-md text-neutral-200 hover:bg-neutral-800 transition"
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-base">{link.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="border-t-2 border-neutral-800 pt-6 px-2">
                {session ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                  >
                    <LogOut className="size-5" />
                    Sign out
                  </Button>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full">Sign in</Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
