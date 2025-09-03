'use client';

import { FeaturesData } from '@/constants';
import { motion } from 'framer-motion';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/UI/components/card';

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
} as const;

const Features = () => {
  return (
    <section className="py-20 max-w-5xl mx-auto">
      <motion.h2
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-neutral-200"
      >
        Why Choose{' '}
        <span className="underline underline-offset-8 decoration-blue-800 ">
          keyType
        </span>
        ?
      </motion.h2>
      <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-8"
      >
        {FeaturesData.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </motion.div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div variants={itemVarients}>
      <Card className="bg-neutral-900/50 border-neutral-800 h-full max-w-xs">
        <CardHeader>
          <CardTitle className="flex item-center space-x-4 text-neutral-200 text-2xl">
            {icon}
            <span>{title}</span>
          </CardTitle>
          <CardDescription className="text-neutral-400 text-base">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default Features;
