'use client ';

import { Button } from '@/UI/components/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVarients = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVarients = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 100,
    },
  },
};

const Intro = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center relative">
      <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.h1
          variants={itemVarients}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-200"
        >
          Develop your Typing Skills <br />
          with <span className="text-blue-800">KEYTYPE</span>
        </motion.h1>

        <motion.p
          variants={itemVarients}
          className="text-lg text-neutral-200 max-w-3xl mx-auto leading-relaxed"
        >
          Practice typing challenge friends and track jmporovement with
          real-time stats in a sleek,minimalist interface.
        </motion.p>
        <motion.div>
          <Button size="lg" asChild>
            <Link href="/type">
              Get Started
              <ArrowRight />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;
