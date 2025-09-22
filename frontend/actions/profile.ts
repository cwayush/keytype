"use server";

import { getUserByEmail } from "@/dboper/user";
import { auth } from "@/auth";
import prisma from "@repo/db";
import { Test } from "@/constants/type";
import {
  calculateTotalTypingTime,
  getAllTimeBestScores,
  getRecentTests,
} from "@/lib/utils";

export const getProfileData = async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized: No valid session found");
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      throw new Error("User not found");
    }

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const testsCompleted = tests.length;
    const averageWpm = testsCompleted
      ? Math.round(
          tests.reduce((sum: number, test: Test) => test.wpm + sum, 0) /
            testsCompleted,
        )
      : 0;

    const averageAccuracy = testsCompleted
      ? Number(
          (
            tests.reduce((sum: number, test: Test) => test.accuracy + sum, 0) /
            testsCompleted
          ).toFixed(1),
        )
      : 0;

    return {
      data: {
        name: user.name || "TypeMaster",
        image: user.image || "/placeholder.svg",
        stats: {
          averageWpm,
          averageAccuracy,
          testsCompleted,
          totalTimeTyping: calculateTotalTypingTime(tests),
        },
        allTimeBestScores: getAllTimeBestScores(tests),
        recentTests: getRecentTests(tests),
      },
    };
  } catch (err) {
    console.error("Error fetching profile data:", err);
    throw err;
  }
};
