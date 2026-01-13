import { useEffect, useState, useTransition } from "react";
import { Loader, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/ui/components/card";
import { fetchReports } from "@/actions/reports";

const itemVarients = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 100,
    },
  },
} as const;

interface report {
  name: string;
  value: number;
}

const Reports = () => {
  const [reports, setReports] = useState<report[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const data = await fetchReports();

      if (!data) {
        setError("Unable to load reports right now. Please try again later.");

        setReports([
          { name: "Typers Registered", value: 500 },
          { name: "Tests Completed", value: 10000 },
        ]);

        return;
      }

      setReports(data);
    });
  }, []);

  return (
    <section className="py-10 relative">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2
          variants={itemVarients}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 text-neutral-200"
        >
          Power in{" "}
          <span className="relative">
            <span className="bg-linear-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Numbers
            </span>
            <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-linear-to-r from-blue-800 to-emerald-800 rounded"></span>
          </span>
        </motion.h2>

        <motion.p
          variants={itemVarients}
          initial="hidden"
          animate="visible"
          className="text-lg text-neutral-300 text-center max-w-xl mx-auto mb-6"
        >
          A quick look at our growing community.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8">
          {isPending ? (
            <Loader className="animate-spin mx-auto size-10 text-blue-700" />
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : reports && reports.length > 0 ? (
            reports.map((report, index) => (
              <Card
                key={index}
                className="bg-neutral-900/50 border-neutral-800 w-full max-w-xs"
              >
                <CardContent className="p-5 text-center space-y-2">
                  <CardTitle className="text-2xl bg-linear-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                    {report.name}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2 text-neutral-300 text-xl">
                    <span>{report.value}</span>
                    <PlusIcon className="w-4 h-4 font-bold" />
                  </CardDescription>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-neutral-400">No reports available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reports;
