'use client';

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

const Engage = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center relative">
      <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative z-10"
      >
        <motion.h2
          variants={itemVarients}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-200 tracking-tight"
        >
          Unlock Your True Typing{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-800 to-emerald-800 bg-clip-text text-transparent">
              Potential
            </span>
            <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-blue-800 to-emerald-800 rounded"></span>
          </span>
        </motion.h2>
        <motion.p
          variants={itemVarients}
          className="text-xl text-normal-400 max-w-3xl mx-auto leading-relaxed"
        >
          Don&apos;t just type faster — type smarter. Track your progress,
          challenge friends, and turn every keystroke into growth with{' '}
          <span className="font-bold bg-gradient-to-r from-blue-800 to-emerald-800 bg-clip-text text-transparent">
            keyType
          </span>
        </motion.p>
        <motion.div variants={itemVarients}>
          <Button size="lg" asChild>
            <Link href="/type">
              Get Started for <ArrowRight />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Engage;
