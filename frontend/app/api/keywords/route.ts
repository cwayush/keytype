import { auth } from "@/auth";
import prisma from "@repo/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { perWord, perKey } = await req.json();

    if (!perWord || !perKey) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    await prisma.$transaction([
      prisma.weakWordStat.deleteMany({ where: { userId } }),
      prisma.weakKeyStat.deleteMany({ where: { userId } }),
    ]);

    const wordData = Object.entries(perWord).map(([word, data]: any) => ({
      userId,
      word,
      attempts: data.attempts,
      errorCount: data.errors,
      typeSentence: data.typedSentence,
      correctSentence: data.correctSentence,
      totalTime: data.totalTime,
      avgTime: Math.round(data.totalTime / data.attempts),
    }));

    const keyData = Object.entries(perKey).map(([char, data]: any) => ({
      userId,
      char,
      attempts: data.attempts,
      errorCount: data.errors,
      expectedChar: data.correctChar,
    }));

    await prisma.$transaction([
      prisma.weakWordStat.createMany({ data: wordData }),
      prisma.weakKeyStat.createMany({ data: keyData }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Keyword POST error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const [words, keys] = await Promise.all([
      prisma.weakWordStat.findMany({ where: { userId } }),
      prisma.weakKeyStat.findMany({ where: { userId } }),
    ]);

    const collectWords = words
      .map((w) => ({
        word: w.word,
        attempts: w.attempts,
        errorRate: w.errorCount / w.attempts,
        typedSentence: w.typeSentence,
        correctSentence: w.correctSentence,
        totalTime: w.totalTime,
        avgTime: w.avgTime,
      }))
      .filter((w) => w.errorRate > 0.4 || w.avgTime > 900)
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 5);

    const collectKeys = keys
      .map((k) => ({
        key: k.char,
        attempts: k.attempts,
        errors: k.errorCount,
        errorRate: k.attempts ? (k.errorCount / k.attempts) * 100 : 0,
      }))
      .filter((k) => k.attempts >= 1)
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      collectWords,
      collectKeys,
    });
  } catch (err) {
    console.error("Keyword GET error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
