'use client';

import { useState, useEffect } from 'react';
import { generateExercise } from '@/actions/generate-exercise';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components/card';
import { ChartContainer, ChartTooltip } from '@/ui/components/chart';
import { Button } from '@/ui/components/button';
import { ResultProps } from '@/constants/type';
import ReportCard from '../profile/reportCard';
import { motion } from 'framer-motion';
import {
  Activity,
  LineChartIcon,
  Hourglass,
  RotateCcw,
  Target,
  WandSparkles,
  X,
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/ui/components/sheet';

const Result = ({
  wpm,
  accuracy,
  time,
  wpmData,
  onRestart,
  mode,
  modeOption,
}: ResultProps) => {
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleGenerate = async () => {
    try {
      setError(null);
      if (exercise) {
        setOpen(true);
        return;
      }

      setLoading(true);

      const res = await generateExercise();
      setExercise(res);
      setOpen(true);
    } catch (err) {
      setError('Something went wrong while generating analysis');
    } finally {
      setLoading(false);
    }
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div className="flex flex-rows gap-4">
        <motion.div variants={itemVariants}>
          <Card className="bg-neutral-900/50  border-neutral-800 shadow-lg">
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
                className="md:h-[400px] sm:h-[300px]"
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
        <motion.div
          variants={itemVariants}
          className="grid grid-rows-1 w-[20%] sm:grid-rows-3 gap-4"
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
          <Button
            size="lg"
            variant="secondary"
            onClick={handleGenerate}
            disabled={loading}
          >
            <WandSparkles />
            {loading ? 'Generating Practice...' : 'Analyzing with AI...'}
          </Button>
          <Button size="lg" onClick={onRestart}>
            <RotateCcw />
            Type Again
          </Button>
        </motion.div>
      </motion.div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="bg-neutral-900/90 backdrop-blur-xlborder-neutral-700 max-h-[90vh] overflow-y-auto"
        >
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl">
                🎯 AI Typing Exercise — Personalized Insights
              </SheetTitle>
            </div>

            <SheetDescription>
              Generated based on your weak keys & error patterns
            </SheetDescription>
          </SheetHeader>

          {exercise && (
            <div className="mt-4 space-y-6 pb-6">
              {/* SUMMARY */}
              <div className="bg-neutral-800/70 p-4 rounded-xl border border-neutral-700">
                <h3 className="text-lg font-semibold mb-2">
                  📌 Performance Summary
                </h3>
                <p className="text-neutral-300">{exercise.summary}</p>
              </div>

              {/* WEAK KEYS */}
              <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  ⌨️ Weak Keys Detected
                </h3>

                <div className="space-y-3">
                  {exercise.weakKeys.map((k: any, i: number) => (
                    <div
                      key={i}
                      className="bg-neutral-800/60 p-3 rounded-lg border border-neutral-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-emerald-400">
                          {k.key.toUpperCase()}
                        </span>

                        <span className="text-sm text-amber-300">
                          Error Rate: {(k.errorRate * 100).toFixed(0)}%
                        </span>
                      </div>

                      <p className="text-neutral-300 mt-2">
                        <b>Issue:</b>{' '}
                        {k.issue ||
                          `${k.errors} errors over ${k.attempts} attempts`}
                      </p>

                      <p className="text-neutral-400 text-sm mt-1">
                        <b>Reason:</b> {k.reason}
                      </p>

                      <p className="text-emerald-300 text-sm mt-1">
                        <b>Coaching Tip:</b> {k.coachingTip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* WEAK WORDS */}
              <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-700">
                <h3 className="text-lg font-semibold mb-3">
                  📝 Weak Words & Typing Mistakes
                </h3>

                <div className="space-y-3">
                  {exercise.weakWords.map((w: any, i: number) => (
                    <div
                      key={i}
                      className="bg-neutral-800/60 p-3 rounded-lg border border-neutral-700"
                    >
                      <div className="flex justify-between">
                        <span className="font-bold text-red-400">{w.word}</span>

                        <span className="text-sm text-amber-300">
                          Error Rate: {(w.errorRate * 10).toFixed(0)}%
                        </span>
                      </div>

                      <p className="text-neutral-400 mt-2">
                        <b>Typed:</b> {w.typedSentence}
                      </p>

                      <p className="text-emerald-300">
                        <b>Correct:</b> {w.correctSentence}
                      </p>

                      <p className="text-neutral-300 mt-1">
                        <b>Reason:</b> {w.reason}
                      </p>

                      <p className="text-emerald-300 text-sm mt-1">
                        <b>Coaching Tip:</b> {w.coachingTip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRACTICE ADVICE */}
              <div className="bg-amber-900/20 border border-amber-700 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">🎯 Training Focus</h3>

                <ul className="list-disc ml-5 text-amber-200">
                  {exercise.practiceAdvice.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* MOTIVATION */}
              <div className="bg-emerald-900/20 border border-emerald-600 p-4 rounded-xl">
                <h3 className="font-semibold mb-1">💪 Motivation</h3>
                <p className="text-emerald-300">{exercise.motivation}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </>
  );
};

export default Result;
