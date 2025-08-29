'use server';

import { AddTestTypes } from '@/constants/type';
import { getUserByEmail } from '@/dboper/user';
import { auth } from '@/option';
import prisma from '@repo/db';

export const addTest = async ({
  wpm,
  accuracy,
  time,
  mode,
  modeOption,
}: AddTestTypes) => {
  try {
    if (!wpm || !accuracy || !time || !mode || !modeOption) {
      throw new Error('Missing required parameters');
    }

    const session = auth();

    if (!session?.user?.email) {
      throw new Error('Unauthorized: No valid session found');
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error('User not found');
    }

    return await prisma.test.create({
      data: {
        wpm: Math.round(wpm),
        accuracy: Number(accuracy),
        time: Math.round(time),
        mode,
        modeOption,
        userId: user.id,
      },
    });
  } catch (err) {
    console.error('Error adding test:', err);
    throw err;
  }
};
