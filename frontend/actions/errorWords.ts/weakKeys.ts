import prisma from '@repo/db';

export async function processWeakKeys(userId: string, keystrokes: any[]) {
  const perKey: Record<
    string,
    { attempts: number; errors: number; correctChar: string }
  > = {};

  for (const k of keystrokes) {
    if (k.isCorrect) continue;

    const char = k.typedChar;

    if (!perKey[char]) {
      perKey[char] = { attempts: 0, errors: 0, correctChar: k.expectedChar };
    }

    perKey[char].attempts++;
    perKey[char].errors++;
  }

  await prisma.weakKeyStat.deleteMany({ where: { userId } });

  for (const [char, data] of Object.entries(perKey)) {
    await prisma.weakKeyStat.create({
      data: {
        userId,
        char,
        attempts: data.attempts,
        errorCount: data.errors,
        expectedChar: data.correctChar,
      },
    });
  }
}

export async function getWeakKeys(userId: string) {
  const stats = await prisma.weakKeyStat.findMany({
    where: { userId },
  });

  return stats
    .map((s) => ({
      key: s.char,
      totalAttempts: s.attempts,
      errors: s.errorCount,
      errorRate: s.attempts > 0 ? s.errorCount / s.attempts : 0,
    }))
    .filter((s) => s.totalAttempts >= 5 || s.errors >= 3)
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, 5);
}
