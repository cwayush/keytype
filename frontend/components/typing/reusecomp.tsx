import { Button } from "@/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/ui/components/tooltip";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";

type CardProps = {
  onReset: () => void;
};

type Message = {
  message: string;
};

export function GuestPromptCard({ onReset }: CardProps) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className=" md:w-full md:max-w-xl max-w-md rounded-md border border-neutral-600
                    bg-neutral-900 md:p-6 p-4 mt-20 text-center"
    >
      <h2 className="flex items-center justify-center gap-3 md:text-2xl text-lg font-semibold text-neutral-200">
        That was smooth <span className="text-4xl">👀</span>
      </h2>

      <p className="text-neutral-400 md:text-lg text-xs mt-2">
        Want to see how fast you really are?
        <br /> Sign in to unlock full results.
      </p>

      <div className="flex gap-4 justify-center mt-6 text-xs">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push("/auth/signin")}
        >
          SignIn / SignUp
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="border border-neutral-600"
        >
          Try Again
        </Button>
      </div>
    </motion.div>
  );
}

export function ResetButton({ onReset }: CardProps) {
  return (
    <div className="mt-10 flex justify-center relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onReset}
            className="text-neutral-400 hover:text-white transition"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          align="center"
          className="bg-white text-black border-0 font-medium px-3 py-1 text-xs"
        >
          Restart Test
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function AILoader({ message }: Message) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "easeInOut",
          }}
          className="h-13 w-13 rounded-full border-4 border-neutral-300 border-t-blue-500"
        />
        <p className="text-neutral-200 text-md tracking-wide">{message}</p>
      </div>
    </div>
  );
}
