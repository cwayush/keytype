'use client';

import Features from '@/components/landing_page/features';
import Stats from '@/components/landing_page/feature2';
import Hero from '@/components/landing_page/hero';
import CTA from '@/components/landing_page/feature3';
import Testimonials from '@/components/landing_page/feature4';
import Footer from '@/components/landing_page/footer';

export default function Home() {
  return (
    <main className="grid place-content-center mt-20">
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Testimonials />
      <Footer />
    </main>
  );
}
