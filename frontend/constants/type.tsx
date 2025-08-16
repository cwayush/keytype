import { Dispatch, SetStateAction } from "react";

export type ModesProps = {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  modeOption: number;
  setModeOption: Dispatch<SetStateAction<number>>;
};


declare type GenerateOptions = {
  min?: number;
  max?: number;
  exactly?: number;
  minLength?: number;
  maxLength?: number;
  wordsPerString?: number;
  separator?: string;
  formatter?: (word: string, index: number) => string;
  seed?: string;
};

declare type JoinedWordsOptions = GenerateOptions & { join: string };

declare function generate(count?: number): string | string[];
declare function generate(options: GenerateOptions): string | string[];
declare function generate(options: JoinedWordsOptions): string;

declare const wordsList: string[];

declare type CountOptions = {
  minLength?: number;
  maxLength?: number;
};

declare function count(options?: CountOptions): number;

export { generate, count, wordsList };


export type ResultProps = {
  wpm: number;
  accuracy: number;
  time: number;
  wpmData: { time: number; wpm: number }[];
  onRestart: () => void;
  mode: string;
  modeOption: number;
};


export type LeaderboardDataType = {
  rank: number;
  name: string;
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
};

export type RecentPerformanceProps = {
  recentTests: { date: string | undefined; wpm: number }[];
};

export type ProfileHeaderProps = {
  image: string;
  name: string;
};

export type StatsGridProps = {
  stats: {
    averageWpm: number;
    averageAccuracy: number;
    testsCompleted: number;
    totalTimeTyping: string;
  };
};


export type BestScoresProps = {
  allTimeBestScores: {
    time: {
      "15s": number;
      "30s": number;
    };
    words: {
      "10": number;
      "25": number;
      "50": number;
    };
  };
};

export type Test = {
  id: string;
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
  modeOption: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};