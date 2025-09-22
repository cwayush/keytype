'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/UI/components/card';
import { ChartContainer, ChartTooltip } from '@/UI/components/chart';
import { Button } from '@/UI/components/button';
import { ResultProps } from '@/constants/type';
import ReportCard from '../profile/reportCard';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import {
  Activity,
  LineChartIcon,
  Hourglass,
  RotateCcw,
  Target,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const Result = ({
  wpm,
  accuracy,
  time,
  wpmData,
  onRestart,
  mode,
  modeOption,
}: ResultProps) => {
  useEffect(() => {
    const addToLeaderboard = async () => {
      try {
        if (!wpm || !accuracy || !time || !mode || !modeOption) return;

        await fetch('/api/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wpm,
            accuracy: parseFloat(accuracy.toFixed(2)),
            time,
            mode,
          }),
        });
      } catch (err) {
        console.log('Error adding to leaderboard:', err);
      }
    };

    addToLeaderboard();
  }, [wpm, accuracy, time, mode, modeOption]);

  const averageWPM = Math.round(
    wpmData.reduce((sum, data) => sum + data.wpm, 0) / wpmData.length
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <ReportCard
          icon={<Activity className="size-8 mr-2 text-sky-400" />}
          title="WPM"
          value={wpm}
        />
        <ReportCard
          icon={<Target className="size-8 mr-2 text-emerald-400" />}
          title="Accuracy"
          value={`${accuracy.toFixed(2)}%`}
        />
        <ReportCard
          icon={<Hourglass className="size-8 mr-2 text-violet-400" />}
          title="Time"
          value={`${time}s`}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-neutral-900/50 border-neutral-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-xl flex items-center gap-4 ">
              <LineChartIcon className="size-6 text-primary text-blue-500" />
              Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                wpm: {
                  label: 'WPM',
                  color: 'hsl(222, 91%, 39.5%)',
                },
                average: {
                  label: 'Average WPM',
                  color: 'hsl(47, 100%, 68%)',
                },
              }}
              className="h-[300px] sm:h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={wpmData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `${value}s`}
                    opacity={0.5}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    domain={['dataMin - 5', 'dataMax + 5']}
                    opacity={0.5}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg bg-neutral-800 p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-neutral-200">
                                  Time
                                </span>
                                <span className="font-bold text-blue-600">
                                  {payload[0]?.payload.time}s
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-neutral-200">
                                  WPM
                                </span>
                                <span className="font-bold text-emerald-600">
                                  {payload[0]?.payload.wpm}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={averageWPM}
                    stroke="hsl(47, 100%, 68%)"
                    strokeDasharray="15"
                    label={{
                      value: `Avg: ${averageWPM} WPM`,
                      fill: 'hsl(47, 100%, 68%)',
                      fontSize: 12,
                      position: 'insideBottomRight',
                    }}
                  />
                  <Line
                    type="linear"
                    dataKey="wpm"
                    stroke="hsl(222, 91%, 39.5%)"
                    strokeWidth={3}
                    dot={{ r: 3, fill: 'hsl(47, 100%, 68%)' }}
                    activeDot={{
                      r: 6,
                      fill: 'hsl(47, 100%, 68%)',
                      stroke: 'hsl(var(--background))',
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <Button size="lg" onClick={onRestart}>
          <RotateCcw />
          Type Again
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Result;
