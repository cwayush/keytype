import { KeyState, WordState } from "./type";

export async function processWeak(wordStats: any[], keystrokes: any[]) {
  const perWord: Record<string, WordState> = {};
  const perKey: Record<string, KeyState> = {};

  for (const w of wordStats) {
    if (w.isCorrect) continue;

    if (!perWord[w.word]) {
      perWord[w.word] = {
        attempts: 0,
        errors: 0,
        totalTime: 0,
        duration: w.duration,
        typedSentence: w.typedSentence,
        correctSentence: w.correctSentence,
      };
    }

    perWord[w.word].attempts++;
    perWord[w.word].errors += w.errors;
    perWord[w.word].totalTime += w.duration;
  }

  for (const k of keystrokes) {
    if (k.isCorrect) continue;

    if (!perKey[k.typedChar]) {
      perKey[k.typedChar] = {
        attempts: 0,
        errors: 0,
        correctChar: k.expectedChar,
      };
    }

    perKey[k.typedChar].attempts++;
    perKey[k.typedChar].errors++;
  }

  const res = await fetch("/api/keywords", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ perWord, perKey }),
  });

  if (!res.ok) {
    throw new Error("Failed to store weak stats");
  }

  return res.json();
}

export async function getWeak() {
  const res = await fetch("/api/keywords", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weak stats");
  }

  return res.json();
}
