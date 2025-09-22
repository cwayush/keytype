"use client";

import Features from "@/components/landing_page/features";
import Reviews from "@/components/landing_page/reviews";
import Reports from "@/components/landing_page/reports";
import Footer from "@/components/landing_page/footer";
import Engage from "@/components/landing_page/engage";
import Intro from "@/components/landing_page/intro";

export default function Home() {
  return (
    <main className="grid place-content-center mt-20">
      <Intro />
      <Features />
      <Reports />
      <Engage />
      <Reviews />
      <Footer />
    </main>
  );
}
