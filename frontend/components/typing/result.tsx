"use client";

import { useState, useEffect } from "react";
import { generateExercise } from "@/actions/generate-exercise";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { ChartContainer, ChartTooltip } from "@/ui/components/chart";
import { Button } from "@/ui/components/button";
import { ResultProps } from "@/constants/type";
import ReportCard from "../profile/reportCard";
import { motion } from "framer-motion";
import {
  Activity,
  LineChartIcon,
  Hourglass,
  RotateCcw,
  Target,
  WandSparkles,
  TrendingDown,
  ChevronRight,
  Clock,
  BookOpen,
  Keyboard,
  Sparkles,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/ui/components/sheet";
import { messages } from "@/constants";
import { AILoader } from "./reusecomp";
import { addScoreToLeaderboard } from "@/actions/leaderboard";

const Result = ({
  wpm,
  accuracy,
  time,
  wpmData,
  onRestart,
  mode,
  modeOption,
  hasMistakes,
}: ResultProps) => {
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [loading]);

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
      setError("Something went wrong while generating analysis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addScoreToLeaderboard({
      wpm,
      accuracy: parseFloat(accuracy.toFixed(2)),
      time,
      mode,
    });
  }, [wpm, accuracy, time, mode, modeOption]);

  const averageWPM = Math.round(
    wpmData.reduce((sum, data) => sum + data.wpm, 0) / wpmData.length
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  type WeakWord = {
    word: string;
    attempts: number;
    errorRate: number;
    typedSentence: string;
    correctSentence: string;
    reason: string;
    coachingTip: string;
    totalTime: number;
    avgTime: number;
  };

  type WeakKey = {
    key: string;
    attempts: number;
    errors: number;
    errorRate: number;
    issue: string;
    reason: string;
    coachingTip: string;
  };

  return (
    <>
      <motion.div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_250px] gap-6 w-full">
        <motion.div variants={itemVariants}>
          <Card className="bg-neutral-900/50 border-neutral-800 md:shadow-lg shadow-none w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle className="md:text-xl text-md flex items-center gap-4 ">
                <LineChartIcon className="size-6 text-primary text-blue-500" />
                Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  wpm: {
                    label: "WPM",
                    color: "hsl(222, 91%, 39.5%)",
                  },
                  average: {
                    label: "Average WPM",
                    color: "hsl(47, 100%, 68%)",
                  },
                }}
                className="md:h-[350px] h-auto md:w-full w-[350px]"
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
                      domain={["dataMin - 5", "dataMax + 5"]}
                      opacity={0.5}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-md bg-neutral-800 p-2 shadow-sm">
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
                        fill: "hsl(47, 100%, 68%)",
                        fontSize: 12,
                        position: "insideBottomRight",
                      }}
                    />
                    <Line
                      type="linear"
                      dataKey="wpm"
                      stroke="hsl(222, 91%, 39.5%)"
                      strokeWidth={3}
                      dot={{ r: 3, fill: "hsl(47, 100%, 68%)" }}
                      activeDot={{
                        r: 6,
                        fill: "hsl(47, 100%, 68%)",
                        stroke: "hsl(var(--background))",
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="grid grid-rows-3 gap-4">
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

          <div className="flex flex-col items-center gap-3 justify-center">
            {hasMistakes && (
              <Button
                size="lg"
                variant="secondary"
                onClick={handleGenerate}
                disabled={loading}
                className="md:w-full w-fit px-6"
              >
                <WandSparkles />
                {loading ? "Generating Practice..." : "Analyzing with AI..."}
              </Button>
            )}

            <Button
              size="lg"
              onClick={onRestart}
              className="md:w-full w-fit px-6"
            >
              <RotateCcw />
              Type Again
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {loading && <AILoader message={message} />}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="bg-linear-to-br from-neutral-900 to-neutral-950 backdrop-blur-xl border-neutral-700 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          <SheetHeader className="bg-linear-to-r from-blue-700/50 to-emerald-700/50 border-b border-neutral-800 p-5">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl flex gap-2">
                <Sparkles className="w-6 h-6 text-blue-400" /> AI Typing
                Analysis
              </SheetTitle>
            </div>

            <SheetDescription className="text-neutral-400 text-sm">
              Personalized insights based on your performance
            </SheetDescription>
          </SheetHeader>

          {exercise && (
            <div className="mt-4 space-y-6 pb-6">
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-md p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Performance Summary
                    </h3>
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {exercise.summary}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Keyboard className="w-5 h-5 text-red-400" />
                    <h3 className="text-xl font-bold text-white">
                      Weak Keys Detected
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {exercise.weakKeys.map((k: WeakKey, i: number) => (
                      <Card
                        key={i}
                        className="bg-neutral-900 border border-neutral-800 rounded-md p-4 hover:border-neutral-200 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-auto h-auto p-2 bg-red-500/20 border border-red-500/50 rounded-md flex items-center justify-center">
                              <span className="text-xl font-bold text-red-400">
                                {k.key === " " ? "Space" : k.key}
                              </span>
                            </div>
                            <div>
                              <div className="text-xs text-neutral-400">
                                Error Rate
                              </div>
                              <div className="text-xl font-bold text-red-500">
                                {(k.errorRate * 100).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-neutral-500">
                              Attempts
                            </div>
                            <div className="text-base font-semibold text-neutral-300">
                              {k.errors}/{k.attempts}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-neutral-800/50 rounded-lg p-2.5">
                            <div className="text-xs font-semibold text-orange-400 mb-1">
                              ISSUE
                            </div>
                            <div className="text-xs text-neutral-300">
                              {k.issue}
                            </div>
                          </div>

                          <div className="bg-neutral-800/50 rounded-lg p-2.5">
                            <div className="text-xs font-semibold text-yellow-400 mb-1">
                              REASON
                            </div>
                            <div className="text-xs text-neutral-300">
                              {k.reason}
                            </div>
                          </div>

                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2.5">
                            <div className="text-xs font-semibold text-green-400 mb-1 flex items-center gap-1">
                              <ChevronRight className="w-3 h-3" />
                              COACHING TIP
                            </div>
                            <div className="text-xs text-green-300">
                              {k.coachingTip}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-orange-400" />
                    <h3 className="text-xl font-bold text-white">
                      Weak Words & Typing Mistakes
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {exercise.weakWords.map((w: WeakWord, i: number) => (
                      <div
                        key={i}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-200 transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="px-2.5 py-1 bg-orange-500/20 border border-orange-500/50 rounded-lg">
                              <span className="text-base font-mono font-bold text-orange-400">
                                {w.word}
                              </span>
                            </div>
                            <div className="text-xs">
                              <span className="text-neutral-400">Error: </span>
                              <span className="text-orange-400 font-bold">
                                {(w.errorRate * 10).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-lg">
                            <Clock className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300">
                              {(w.avgTime / 1000).toFixed(2)}s
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
                              <div className="text-xs font-semibold text-red-400 mb-1">
                                YOU TYPED
                              </div>
                              <div className="text-xs font-mono text-red-300 break-all">
                                {w.typedSentence}
                              </div>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2.5">
                              <div className="text-xs font-semibold text-green-400 mb-1">
                                CORRECT
                              </div>
                              <div className="text-xs font-mono text-green-300 break-all">
                                {w.correctSentence}
                              </div>
                            </div>
                          </div>

                          <div className="bg-neutral-800/50 rounded-lg p-2.5">
                            <div className="text-xs font-semibold text-yellow-400 mb-1">
                              REASON
                            </div>
                            <div className="text-xs text-neutral-300">
                              {w.reason}
                            </div>
                          </div>

                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2.5">
                            <div className="text-xs font-semibold text-blue-400 mb-1 flex items-center gap-1">
                              <ChevronRight className="w-3 h-3" />
                              COACHING TIP
                            </div>
                            <div className="text-xs text-blue-300">
                              {w.coachingTip}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Training Focus
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {exercise.practiceAdvice.map((tip: string[], i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-purple-400">
                            {i + 1}
                          </span>
                        </div>
                        <p className="text-neutral-300 text-xs leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5 text-center">
                  <div className="text-3xl mb-2">💪</div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Keep Going!
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {exercise.motivation}
                  </p>
                </div>
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
