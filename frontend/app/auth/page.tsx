'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/UI/components/tabs';
import SignInForm from '@/components/auth/signinForm';
import SignUpForm from '@/components/auth/signupForm';
import { Button } from '@/UI/components/button';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Chrome } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/UI/components/card';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

const AuthPage = () => {
  const handleClick = () => {
    signIn('google', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center justify-center mt-10 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        <Card className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800/60 shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-white">
              Welcome to KeyType
            </CardTitle>
            <CardDescription className="text-center text-neutral-400">
              Sign in to your account or create a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full space-y-6">
              <TabsList className="grid w-full grid-cols-2 rounded-lg bg-neutral-800/60 p-1">
                <TabsTrigger
                  value="signin"
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 
                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-800 data-[state=active]:to-emerald-800 
                    data-[state=active]:text-white hover:bg-neutral-700"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 
                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-800 data-[state=active]:to-emerald-800 
                    data-[state=active]:text-white hover:bg-neutral-700"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignInForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full mt-2 flex items-center justify-center gap-2 
              bg-white text-neutral-900 font-semibold py-2 rounded-lg shadow-md hover:bg-neutral-100 transition"
              onClick={handleClick}
            >
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
