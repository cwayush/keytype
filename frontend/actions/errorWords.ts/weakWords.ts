import prisma from '@repo/db';

export async function processWeakWords(userId: string, wordStats: any[]) {
  const perWord: Record<
    string,
    {
      attempts: number;
      errors: number;
      totalTime: number;
      duration: number;
      typedSentence: string;
      correctSentence: string;
    }
  > = {};
  for (const w of wordStats) {
    if (w.isCorrect) continue;

    const word = w.word;

    if (!perWord[word]) {
      perWord[word] = {
        attempts: 0,
        errors: 0,
        totalTime: 0,
        duration: w.duration,
        typedSentence: w.typedSentence,
        correctSentence: w.correctSentence,
      };
    }

    perWord[word].attempts++;
    perWord[word].errors += w.errors;
    perWord[word].totalTime = perWord[word].totalTime + w.duration;
  }

  await prisma.weakKeyStat.deleteMany({ where: { userId } });

  for (const [word, data] of Object.entries(perWord)) {
    await prisma.weakWordStat.create({
      data: {
        userId,
        word,
        attempts: data.attempts,
        errorCount: data.errors,
        typeSentence: data.typedSentence,
        correctSentence: data.correctSentence,
        totalTime: data.totalTime,
        avgTime: Math.round(data.totalTime / data.attempts),
      },
    });
  }
}

export async function getWeakWords(userId: string) {
  const stats = await prisma.weakWordStat.findMany({
    where: { userId },
  });

  return stats
    .map((w) => ({
      word: w.word,
      attempts: w.attempts,
      errorRate: w.errorCount / w.attempts,
      typeSentence: w.typeSentence,
      correctSentence: w.correctSentence,
      totalTime: w.totalTime,
      avgTime: w.avgTime,
    }))
    .filter((w) => w.attempts >= 1)
    .filter((w) => w.errorRate > 2 || w.avgTime > 900)
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, 5);
}
