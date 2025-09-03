import { useEffect, useState, useTransition } from 'react';
import { LoaderPinwheel } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/UI/components/card';

const itemVarients = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 100,
    },
  },
} as const;

// ReviewsProps

const Reports = () => {
  const [reports, setReports] = useState<
    null | { name: string; value: number }[]
  >(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await fetch('/api/reports');
      const data = await response.json();
      setReports(data);
    });
  }, []);
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2
          variants={itemVarients}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-neutral-200"
        >
          keyType by{' '}
          <span className="underline underline-offset-8 decoration-blue-800 ">
            Numbers
          </span>
        </motion.h2>
        <div className="flex justify-center gap-8">
          {isPending ? (
            <LoaderPinwheel className="nimate-spin mx-auto size-10 text-blue-700" />
          ) : (
            reports?.map((report, index) => (
              <Card
                key={index}
                className="bg-neutral-900/50 border-neutral-800 w-full max-w-xs"
              >
                <CardContent className="p-5 text-center space-y-2">
                  <CardTitle className="text-blue-800 text-4xl">
                    {report.name}
                  </CardTitle>
                  <CardDescription className="text-neutral-400 text-base">
                    {report.value}
                  </CardDescription>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Reports;
