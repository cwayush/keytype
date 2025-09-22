import { NextRequest, NextResponse } from "next/server";
import { LeaderboardDataType } from "@/constants/type";
import { redis } from "@/lib/redis";
import { auth } from "@/auth";

const ALL_TIME_KEY = "keytype:leaderboard:alltime";
const DAILY_KEY = "keytype:leaderboard:daily";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "all";
  const timeFrame = searchParams.get("timeFrame") || "alltime";
  const limit = parseInt(searchParams.get("limit") || "10");

  const leaderboardKey = timeFrame === "daily" ? DAILY_KEY : ALL_TIME_KEY;

  try {
    const scores = await redis.zrevrange(leaderboardKey, 0, -1, "WITHSCORES");

    const userHighestScore = new Map<string, LeaderboardDataType>();

    for (let i = 0; i < scores.length; i += 2) {
      const userData = JSON.parse(scores[i]!);

      if (mode === "all" || userData.mode === mode) {
        if (!userHighestScore.has(userData.name)) {
          userHighestScore.set(userData.name, {
            rank: 0,
            name: userData.name,
            wpm: userData.wpm,
            accuracy: userData.accuracy,
            time: userData.time,
            mode: userData.mode,
          });
        }
      }
    }
    const leaderboard = Array.from(userHighestScore.values())
      .slice(0, limit)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { wpm, accuracy, time, mode } = await req.json();

    if (!wpm || !accuracy || !time || !mode) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized: No valid session found",
        },
        { status: 401 },
      );
    }

    const score = Math.round(wpm * (accuracy / 100));

    const userData = JSON.stringify({
      name: session.user.name,
      wpm,
      accuracy,
      time,
      mode,
      timeStamp: Date.now(),
    });

    const allTimeScores = await redis.zrange(ALL_TIME_KEY, 0, -1, "WITHSCORES");
    const dailyScores = await redis.zrange(DAILY_KEY, 0, -1, "WITHSCORES");

    for (let i = 0; i < allTimeScores.length; i += 2) {
      const entry = JSON.parse(allTimeScores[i]!);
      if (entry.name === session.user.name) {
        await redis.zrem(ALL_TIME_KEY, allTimeScores[i]!);
      }
    }

    for (let i = 0; i < dailyScores.length; i += 2) {
      const entry = JSON.parse(dailyScores[i]!);
      if (entry.name === session.user.name) {
        await redis.zrem(DAILY_KEY, dailyScores[i]!);
      }
    }
    await Promise.all([
      redis.zadd(ALL_TIME_KEY, score, userData),
      redis.zadd(DAILY_KEY, score, userData),
    ]);

    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const secondsUntilMidnight = Math.floor(
      (midnight.getTime() - Date.now()) / 1000,
    );
    await redis.expire(DAILY_KEY, secondsUntilMidnight);
    return NextResponse.json({
      sucess: true,
      score,
      message: "Score submitted successfully",
    });
  } catch (err) {
    console.error("Error submitting score:", err);
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 },
    );
  }
};
