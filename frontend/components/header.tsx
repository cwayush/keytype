'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/UI/components/button';
import { LogOut, Zap } from 'lucide-react';
import { NAVLINKS } from '@/constants';
import Link from 'next/link';

export function Header() {
  // const { data: session } = useSession();
  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-5 px-0">
      <Link
        href="/"
        className="text-2xl font-bold text-neutral-200 flex items-center space-x-1"
      >
        <Zap className="size-6  text-blue-700" />
        <p>
          KEY<span className="text-blue-700">TYPE</span>
        </p>
      </Link>
      <nav className="flex items-center gap-x-6">
        {NAVLINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-x-2.5 text-neutral-200 hover:text-neutral-100 transition-colors duration-300"
          >
            <link.icon />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        ))}

        {/* {session && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut()}
            className="hover:bg-red-400 hover:text-white transition-colors duration-300"
          >
            <LogOut className="size-6" />
          </Button>
        )} */}
      </nav>
    </header>
  );
}
