import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@repo/db";
import { getUserByEmail } from "@/dboper/user";
import {
  calculateTotalTypingTime,
  getAllTimeBestScores,
  getRecentTests,
} from "@/lib/utils";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const testsCompleted = tests.length;

    const averageWpm = testsCompleted
      ? Math.round(
          tests.reduce((sum, test) => sum + test.wpm, 0) / testsCompleted
        )
      : 0;

    const averageAccuracy = testsCompleted
      ? Number(
          (
            tests.reduce((sum, test) => sum + test.accuracy, 0) / testsCompleted
          ).toFixed(1)
        )
      : 0;

    return NextResponse.json({
      success: true,
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
    });
  } catch (err) {
    console.error("Profile API error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
