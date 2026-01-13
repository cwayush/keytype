"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Chrome, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/ui/components/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants";
import { useForm } from "react-hook-form";
import {
  SignInInput,
  signInSchema,
  SignUpInput,
  signUpSchema,
} from "@/config/zvalidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/register";
import { toast } from "sonner";
import { Input } from "@/ui/components/input";
import { loginUser } from "@/actions/login";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

export default function AuthSlider() {
  const [isLogin, setIsLogin] = useState(false);
  const [isPending, startTransition] = useTransition();

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSignIn = async (values: SignInInput) => {
    startTransition(async () => {
      try {
        const result = await loginUser(values);
        if (result.success) {
          toast.success(result.message);
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          });
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      }
    });
  };

  const signUpForm = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSignUp = async (values: SignUpInput) => {
    console.log("maine click kiya hai");
    startTransition(async () => {
      try {
        const result = await register(values);
        if (result.success) {
          toast.success(result.message);
          setIsLogin(true);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      }
    });
  };

  const handleGoogle = () =>
    signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });

  return (
    <div className="mt-20 flex items-center justify-center md:px-4 px-6">
      <div className="w-full max-w-md md:hidden bg-neutral-900 rounded-md p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center mt-4 mb-8">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form
          onSubmit={
            isLogin
              ? signInForm.handleSubmit(onSignIn)
              : signUpForm.handleSubmit(onSignUp)
          }
          className="flex flex-col gap-3"
        >
          {!isLogin && (
            <Input
              className="border"
              {...signUpForm.register("name")}
              placeholder="Full name"
            />
          )}

          <Input
            className="border"
            type="email"
            {...(isLogin
              ? signInForm.register("email")
              : signUpForm.register("email"))}
            placeholder="Email"
          />

          <Input
            className="border"
            type="password"
            {...(isLogin
              ? signInForm.register("password")
              : signUpForm.register("password"))}
            placeholder="Password"
          />

          <Button className="w-full text-white" disabled={isPending}>
            {isPending ? "Please wait…" : isLogin ? "Login" : "Register"}
          </Button>

          <Button
            variant="link"
            className="text-blue-700"
            onClick={() => setIsLogin(!isLogin)}
            type="button"
          >
            {isLogin
              ? "Don’t have an account? Register"
              : "Already have an account? Login"}
          </Button>

          <Button
            variant="link"
            onClick={handleGoogle}
            type="button"
            className="text-white"
          >
            <Chrome />
            Continue with Google
          </Button>
        </form>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative hidden md:block w-[600px] min-h-[380px] bg-neutral-300/90 rounded-md shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden"
      >
        <motion.div
          animate={{ x: isLogin ? 300 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`absolute top-0 left-0 w-1/2 h-full z-20 flex flex-col items-center justify-center px-8 text-white bg-linear-to-r from-blue-700 to-emerald-700
        ${isLogin ? "rounded-l-[140px]" : "rounded-r-[140px]"}`}
        >
          {!isLogin ? (
            <>
              <h1 className="text-2xl font-bold mb-6">Hello, Friend!</h1>
              <p className="text-sm text-blue-100 text-center mb-2">
                Already have an account?
              </p>
              <p className="text-sm text-blue-100 text-center mb-4">
                Log in and continue where you left off 🚀
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white w-fit"
                onClick={() => setIsLogin(true)}
              >
                LOGIN BACK
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6">Welcome Back!</h1>
              <p className="text-sm text-blue-100 text-center mb-2">
                Don’t have an account yet?
              </p>
              <p className="text-sm text-blue-100 text-center mb-4">
                Create an account to unlock all features ⚡
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-white w-fit text-white"
                onClick={() => setIsLogin(false)}
              >
                GO REGISTER
              </Button>
            </>
          )}
        </motion.div>

        <motion.div
          animate={{ opacity: isLogin ? 1 : 0 }}
          className="absolute inset-0 w-1/2 text-black flex flex-col items-center justify-center px-10"
        >
          <h1 className="text-2xl font-bold font-serif mb-4">Get Account</h1>

          <form
            onSubmit={signInForm.handleSubmit(onSignIn)}
            className="w-full flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                {...signInForm.register("email")}
                placeholder="Email Address"
                icon={<Mail className="w-4 h-4 text-gray-500" />}
                iconPosition="right"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Input
                type="password"
                {...signInForm.register("password")}
                placeholder="Password"
                icon={<LockKeyhole className="w-4 h-4 text-gray-500" />}
                iconPosition="right"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Button className="w-full text-white" disabled={isPending}>
                {isPending ? "Please wait…" : "Login"}
              </Button>

              <Button
                variant="link"
                size="lg"
                className="w-full text-blue-700 font-semibold"
                onClick={handleGoogle}
                type="button"
              >
                <Chrome />
                Continue with Google +
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          animate={{ opacity: isLogin ? 0 : 1 }}
          className="absolute inset-0 left-1/2 w-1/2 flex flex-col items-center text-black justify-center px-10"
        >
          <h1 className="text-2xl  font-bold font-serif mb-4">
            Create Account
          </h1>

          <form
            onSubmit={signUpForm.handleSubmit(onSignUp)}
            className="w-full flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <Input
                {...signUpForm.register("name")}
                placeholder="Full Name"
                icon={<User className="w-4 h-4 text-gray-500" />}
                iconPosition="right"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Input
                type="email"
                {...signUpForm.register("email")}
                placeholder="Email Address"
                icon={<Mail className="w-4 h-4 text-gray-500" />}
                iconPosition="right"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="password"
                {...signUpForm.register("password")}
                placeholder="Password"
                icon={<LockKeyhole className="w-4 h-4 text-gray-500" />}
                iconPosition="right"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Button className="w-full text-white" disabled={isPending}>
                {isPending ? "Please wait…" : "Register"}
              </Button>

              <Button
                variant="link"
                size="lg"
                className="w-full text-blue-700 font-semibold"
                onClick={handleGoogle}
                type="button"
              >
                <Chrome />
                Continue with Google +
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
