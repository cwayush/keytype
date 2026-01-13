"use client";

import { modes, timeOptions, wordOptions } from "@/constants";
import { Hourglass, Type } from "lucide-react";
import { ModesProps } from "@/constants/type";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Modes = ({ mode, setMode, modeOption, setModeOption }: ModesProps) => {
  const handleModeChange = (mode: string) => {
    if (mode == "time") {
      setMode(mode);
      setModeOption(timeOptions[0]!);
    } else if (mode === "words") {
      setMode(mode);
      setModeOption(wordOptions[0]!);
    }
  };

  return (
    <div className="mb-15">
      <motion.div
        className="mx-auto w-fit flex items-center justify-center gap-4"
        layout
      >
        <div className="flex items-center space-x-3 p-1 bg-neutral-900/50 rounded-md shadow-lg">
          {modes.map((modeItem) => (
            <motion.button
              key={modeItem}
              onClick={() => handleModeChange(modeItem)}
              className={cn(
                "rounded-md px-3 py-2 text-xs flex items-center transition-colors duration-200",
                mode === modeItem
                  ? "bg-neutral-800 text-blue-400"
                  : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {modeItem === "words" && <Type className="mr-2 h-4 w-4" />}
              {modeItem === "time" && <Hourglass className="mr-2 h-4 w-4" />}
              {modeItem}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center space-x-2 p-1 bg-neutral-900/50 rounded-md shadow-lg">
          {mode === "time" &&
            timeOptions.map((time) => (
              <motion.button
                key={time}
                onClick={() => setModeOption(time)}
                className={cn(
                  "rounded-md px-3 py-2 text-xs min-w-8 transition-colors duration-200",
                  modeOption === time
                    ? "bg-neutral-800 text-blue-400"
                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {time}
              </motion.button>
            ))}

          {mode === "words" &&
            wordOptions.map((word) => (
              <motion.button
                key={word}
                onClick={() => setModeOption(word)}
                className={cn(
                  "rounded-md px-3 py-2 text-xs min-w-8 transition-colors duration-200",
                  modeOption === word
                    ? "bg-neutral-800 text-blue-400 "
                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {word}
              </motion.button>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Modes;
