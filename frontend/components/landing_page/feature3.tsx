'use client';

import { Button } from '@/ui/src/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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

const CTA = () => {
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
          Ready to Become a{' '}
          <span className="underline underline-offset-8 decoration-blue-800">
            Typing pro
          </span>
          ?
        </motion.h2>
        <motion.p
          variants={itemVarients}
          className="text-xl text-normal-400 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of users who have improves their typing speed and
          accuracy with KEYTYPE
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

export default CTA;
