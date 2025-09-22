"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/avatar";
import { Card, CardContent, CardDescription } from "@/ui/components/card";
import { ReviewsCardProps } from "@/constants/type";
import { ReviewsData } from "@/constants";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Reviews = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl text-neutral-200 font-bold text-center mb-12"
        >
          Every Key{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent">
              Tells a Story
            </span>
            <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-blue-700 to-emerald-700 rounded"></span>
          </span>
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-8 justify-center"
        >
          {ReviewsData.map((review, index) => (
            <ReviewsCard
              key={index}
              name={review.name}
              username={review.username}
              image={review.image}
              tweet={review.tweet}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 100,
    },
  },
};

export const ReviewsCard = ({
  name,
  username,
  image,
  tweet,
}: ReviewsCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-neutral-900/50 border-neutral-800 max-w-md">
        <CardContent className="p-5">
          <div className="flex items-center gap-x-3">
            {/* Gradient Border Wrapper */}
            <div className="rounded-full bg-gradient-to-r from-blue-700 to-emerald-700 p-[2px]">
              <Avatar className="size-8 rounded-full bg-neutral-900">
                <AvatarImage src={image} />
                <AvatarFallback>{name.split(" ")?.[0]?.[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex gap-x-1 items-center">
              <span className="font-bold text-neutral-200">{name}</span>
              <BadgeCheck className="text-emerald-400 size-5" />
            </div>
            <span className="text-neutral-500">@{username}</span>
          </div>

          <CardDescription className="ml-10 pt-1 text-neutral-400 text-base">
            {tweet}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};
