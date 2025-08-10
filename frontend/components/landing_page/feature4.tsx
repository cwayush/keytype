'use client';

import { TESTIMONIALS } from '@/constants';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/UI/components/avatar';
import {
  Card,
  CardContent,
  CardDescription,
} from '@/UI/components/card';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

const containerVarients = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildern: 0.1,
    },
  },
};

const Testimonials = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-neutral-200"
        >
          What Our{' '}
          <span className="underline underline-offset-8 decoration-blue-800">
            Users
          </span>
          Say
        </motion.h2>
        <motion.div
          variants={containerVarients}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              username={testimonial.username}
              image={testimonial.image}
              tweet={testimonial.tweet}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

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

interface TestimonialCardProps {
  name: string;
  username: string;
  image: string;
  tweet: string;
}

export const TestimonialCard = ({
  name,
  username,
  image,
  tweet,
}: TestimonialCardProps) => {
  return (
    <motion.div variants={itemVarients}>
      <Card className="bg-neutral-900/50 border-neutral-800  max-w-md ">
        <CardContent className="p-6">
          <div className="flex items-center gap-x-3">
            <Avatar className="size-8">
              <AvatarImage src={image} />
              <AvatarFallback>{name.split(' ')?.[0]?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex gap-x-1 items-center">
              <span className="font-bold text-neutral-200">{name}</span>
              <BadgeCheck className="text-blue-800 size-5" />
            </div>
            <span className="text-neutral-500">@{username}</span>
          </div>
          <CardDescription className="ml-10 pt-1 text-neutral-300 text-base">
            {tweet}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};
