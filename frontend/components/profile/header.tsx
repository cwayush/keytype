"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/components/avatar";
import { ProfileHeaderProps } from "@/constants/type";

const Header = ({ image, name }: ProfileHeaderProps) => {
  const initials = name?.trim()?.includes(" ")
    ? name
        .split(" ")
        .map((p) => p[0])
        .join("")
    : name?.[0];

  return (
    <header className="flex items-center gap-4 w-full">
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(0,0,0,0)",
            "0 0 54px rgba(0,255,200,.25)",
            "0 0 0px rgba(0,0,0,0)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="rounded-full bg-linear-to-r from-blue-700 to-emerald-700 p-1"
      >
        <Avatar className="md:size-20 size-18 rounded-full bg-neutral-900">
          <AvatarImage src={image} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
      </motion.div>

      <div className="flex flex-col w-full">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-0.5 bg-linear-to-r from-blue-700  to-emerald-700 rounded-full"
        />

        <div className="flex items-center md:justify-between justify-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-2 text-3xl font-bold text-neutral-200"
          >
            {name}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-sm hidden md:block text-neutral-400 tracking-wide hover:text-blue-300 transition-colors"
          >
            Keep pushing your limits 🚀
          </motion.span>
        </div>
      </div>
    </header>
  );
};

export default Header;
