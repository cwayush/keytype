"use client";

import { SignUpInput, signUpSchema } from "@/config/zvalidate";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/components/button";
import { register } from "@/actions/register";
import { Input } from "@/ui/components/input";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/form";
import { toast } from "sonner";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 },
  },
};

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const signUpForm = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSignUp = async (values: SignUpInput) => {
    startTransition(async () => {
      try {
        const result = await register(values);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        console.error("Registration error:", err);
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSignUp)}
        className="space-y-5 text-neutral-200"
      >
        <motion.div variants={childVariants} initial="hidden" animate="visible">
          <FormField
            control={signUpForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      {...field}
                      className="pl-10 bg-neutral-800/70 border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-400 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={childVariants} initial="hidden" animate="visible">
          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                      className="pl-10 bg-neutral-800/70 border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-400 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={childVariants} initial="hidden" animate="visible">
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      type="password"
                      placeholder="•••••••••"
                      {...field}
                      className="pl-10 bg-neutral-800/70 border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-400 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <motion.div
              className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <>
              Sign Up
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
