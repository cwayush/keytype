'use server';

import { authoption } from '@/app/api/auth/[...nextauth]/option';
import prisma from '../../backend/src/config/prismaClient';
import { getUserByEmail } from '@/dboper/user';
import {
  calculateTotalTypingTime,
  getAllTimeBestScores,
  getRecentTests,
} from '@/lib/utils';
import NextAuth from 'next-auth';

export const getProfileData = async () => {
  try {
    const session = await NextAuth(authoption);
    if (!session?.user?.email) {
      throw new Error('Unauthorized: No valid session found');
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      throw new Error('User not found');
    }

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const testCompleted = tests.length;
    const averageWpm = testCompleted
      ? Math.round(
          tests.reduce((sum, test) => test.wpm + sum, 0) / testCompleted
        )
      : 0;

    const averageAccuracy = testCompleted
      ? Number(
          (
            tests.reduce((sum, test) => test.accuracy + sum, 0) / testCompleted
          ).toFixed(1)
        )
      : 0;

    return {
      data: {
        name: user.name || 'TypeMaster',
        image: user.image || '/placeholder.svg',
        stats: {
          averageWpm,
          averageAccuracy,
          testCompleted,
          totalTimeTyping: calculateTotalTypingTime(tests),
        },
        allTimeBestScores: getAllTimeBestScores(tests),
        recentTests: getRecentTests(tests),
      },
    };
  } catch (err) {
    console.error('Error fetching profile data:', err);
    throw err;
  }
};
