'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/ui_temp/components/button';
import { GhostIcon, LogOut } from 'lucide-react';
import { NAVLINKS } from '@/constants';
import Link from 'next/link';

export function Header() {
  const { data: session } = useSession();
  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-5 px-0">
      <Link
        href="/"
        className="relative group inline-flex items-center px-6 py-2 rounded-xl transition-all duration-500"
      >
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-green-400 opacity-0 group-hover:opacity-40 blur-2xl group-hover:scale-400 transition-all duration-500"></span>

        <span className="relative z-10 flex items-center gap-3 font-extrabold text-3xl tracking-wide">
          <GhostIcon className="w-8 h-8 text-white" />
          <span>
            <span className="text-white">key</span>
            <span className="bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent">
              Type
            </span>
          </span>
        </span>
      </Link>
      <nav className="flex items-center gap-x-4">
        {NAVLINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative group flex items-center gap-x-1 text-neutral-200 hover:text-blue-500 transition-colors duration-300 px-3 py-2 rounded-lg"
          >
            <span className="relative z-10 flex items-center gap-x-2">
              <link.icon className="w-5 h-5" />
              <p className="hidden md:block">{link.name}</p>
            </span>
          </Link>
        ))}

        {session && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut()}
            className="hover:bg-gradient-to-r from-blue-800 to-emerald-800 hover:text-black transition-colors duration-300 p-0"
          >
            <LogOut className="size-6" />
          </Button>
        )}
      </nav>
    </header>
  );
}
