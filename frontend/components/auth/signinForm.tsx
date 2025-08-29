import { SignInInput, signInSchema } from '@/config/zvalidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants';
import { Button } from '@/UI/components/button';
import { Input } from '@/UI/components/input';
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
} from '@/UI/components/form';

const childVarients = {
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

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(onSignIn)}
        className="space-y-4 text-neutral-200"
      >
        <motion.div variants={childVarients}>
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-200 ">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      placeholder="example@gmail.xyz"
                      {...field}
                      className="pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div variants={childVarients}>
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-200">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      type="password"
                      placeholder="●●●●●●●●●●"
                      {...field}
                      className="pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
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
