'use server';

import { AddTestTypes } from '@/constants/type';
import { getUserByEmail } from '@/dboper/user';
import { auth } from '@/auth';
import prisma from '@repo/db';
import { processWeakKeys } from './errorWords.ts/weakKeys';
import { processWeakWords } from './errorWords.ts/weakWords';

export const addTest = async ({
  wpm,
  accuracy,
  time,
  mode,
  modeOption,
  keystrokes,
  wordStats,
}: AddTestTypes) => {
  try {
    if (!wpm || !accuracy || !time || !mode || !modeOption) {
      throw new Error('Missing required parameters');
    }

    if (!keystrokes || !wordStats) {
      throw new Error('Missing analytics data');
    }

    const session = await auth();

    if (!session?.user?.email) {
      throw new Error('Unauthorized: No valid session found');
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error('User not found');
    }

    const test = await prisma.test.create({
      data: {
        wpm: Math.round(wpm),
        accuracy: Number(accuracy),
        time: Math.round(time),
        mode,
        modeOption,
        userId: user.id,
      },
    });

    await processWeakWords(user.id, wordStats);
    await processWeakKeys(user.id, keystrokes);

    return test;
  } catch (err) {
    console.error('Error adding test:', err);
    throw err;
  }
};
