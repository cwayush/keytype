export type AddTestTypes = {
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
  modeOption: number;
};

export type AddLead = {
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
  modeOption?: number;
};

export type Filter = {
  selectedMode: string;
  timeFrame: string;
  limit?: number;
};

export type ReportItem = {
  name: string;
  value: number;
};

export type WordState = {
  attempts: number;
  errors: number;
  totalTime: number;
  duration: number;
  typedSentence: string;
  correctSentence: string;
};

export type KeyState = {
  attempts: number;
  errors: number;
  correctChar: string;
};
