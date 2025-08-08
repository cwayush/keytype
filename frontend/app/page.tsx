'use client';

import { Header } from '@/components/header';
import Features from '@/components/landing_page/features';
import Stats from '@/components/landing_page/feature2';
import Hero from '@/components/landing_page/hero';
import { SessionProvider } from 'next-auth/react';
// import Image from 'next/image';

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <Hero />
      <Features />
      <Stats />
    </SessionProvider>
   ///
  );
}
