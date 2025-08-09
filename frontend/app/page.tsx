'use client';

import { Header } from '@/components/header';
import Features from '@/components/landing_page/features';
import Stats from '@/components/landing_page/feature2';
import Hero from '@/components/landing_page/hero';
import { SessionProvider } from 'next-auth/react';
import CTA from '@/components/landing_page/feature3';
import Testimonials from '@/components/landing_page/feature4';
import Footer from '@/components/landing_page/footer';
// import Image from 'next/image';

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <main className="grid place-content-center mt-20">
        <Hero />
        <Features />
        <Stats />
        <CTA />
        <Testimonials />
        <Footer />
      </main>
    </SessionProvider>
    ///
  );
}
