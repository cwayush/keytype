'use client';

import { SignInInput, signInSchema } from '@/config/zvalidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants';
import { Button } from '@/ui_temp/components/button';
import { Input } from '@/ui_temp/components/input';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { login } from '@/actions/login';
import { useTransition } from 'react';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui_temp/components/form';
import { toast } from 'sonner';

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 20, stiffness: 100 },
  },
};

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSignIn = async (values: SignInInput) => {
    startTransition(async () => {
      try {
        const result = await login(values);
        if (result.success) {
          await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          });
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        console.error('Sign in error:', err);
        toast.error('Something went wrong!');
      }
    });
  };

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(onSignIn)}
        className="space-y-5 text-neutral-200"
      >
        <motion.div variants={childVariants} initial="hidden" animate="visible">
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
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
            control={signInForm.control}
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
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
