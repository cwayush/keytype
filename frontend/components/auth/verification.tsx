'use client';

import { CircleCheckBig, TriangleAlert } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { verification } from '@/actions/verification';
import BeatLoader from 'react-spinners/BeatLoader';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/UI/components/card';

const containerVarients = {
  hidden: { opacity: 0 },
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

const Verification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean | null>(null);

  const onSubmit = useCallback(() => {
    if (!token) {
      setSuccess(false);
      setMessage('Missing Token!');
      return;
    }

    verification(token)
      .then((res) => {
        setSuccess(res.success);
        setMessage(res.message);
      })
      .catch((err) => {
        setSuccess(false);
        console.error(err);
        setMessage('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center justify-center mt-10 p-4">
      <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="bg-neutral-900/50 border-neutral-800 ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-neutral-200">
              Email Verification
            </CardTitle>
            <CardDescription className="text-center text-neutral-400">
              Please check your email for the verification link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-6">
              {success !== null ? (
                <>
                  <div
                    className={cn(
                      'p-3 rounded-md flex items-center gap-x-2 text-sm',
                      success
                        ? 'bg-emerald-500/15 text-emerald-500'
                        : 'bg-destructive/15 text-destructive'
                    )}
                  >
                    {success ? (
                      <CircleCheckBig className="w-4 h-4" />
                    ) : (
                      <TriangleAlert className="w-4 h-4" />
                    )}
                    <p>{message}</p>
                  </div>
                  <Link
                    href="/auth"
                    className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    Back to login
                  </Link>{' '}
                </>
              ) : (
                <BeatLoader color="#ffffff" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Verification;
