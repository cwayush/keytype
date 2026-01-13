import { auth } from "@/auth";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import prisma from "@repo/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const wordStats = await prisma.weakWordStat.findMany({
    where: { userId },
  });

  const keyStats = await prisma.weakKeyStat.findMany({
    where: { userId },
  });

  const collectWords = wordStats
    .map((w) => ({
      word: w.word,
      attempts: w.attempts,
      errorRate: w.errorCount / w.attempts,
      typedSentence: w.typeSentence,
      correctSentence: w.correctSentence,
      totalTime: w.totalTime,
      avgTime: w.avgTime,
    }))
    .filter((w) => w.attempts >= 1)
    .filter((w) => w.errorRate > 2 || w.avgTime > 900)
    .slice(0, 5);

  const collectKeys = keyStats
    .map((k) => ({
      key: k.char,
      attempts: k.attempts,
      errors: k.errorCount,
      errorRate: k.attempts ? k.errorCount / k.attempts : 0,
    }))
    .filter((k) => k.attempts >= 1)
    .slice(0, 5);

  if (!collectWords.length && !collectKeys.length) {
    return NextResponse.json(
      { error: "Not enough typing data yet" },
      { status: 400 }
    );
  }

  const prompt = `
  You are a professional typing coach analyzing real user typing performance data.

  USER'S WEAK KEYS DATA:
  ${JSON.stringify(collectKeys, null, 2)}

  USER'S WEAK WORDS DATA:
  ${JSON.stringify(collectWords, null, 2)}

  ANALYSIS GUIDELINES:
  - Use ONLY the actual data provided above
  - Reference specific error rates, attempts, and timing from the data
  - For words, consider both error rate AND typing time (avgTime in milliseconds)
  - Slower typing time indicates hesitation or difficulty even if accurate
  - Provide actionable, specific coaching based on the patterns you see
  - Be encouraging but realistic about areas needing improvement

  RETURN ONLY VALID JSON IN THIS EXACT FORMAT:
  {
    "summary": "2-3 sentence analysis of overall typing performance. Reference specific patterns like 'Your 'k' and 'n' keys show 100% error rates' or 'Words taking over 3 seconds indicate hesitation'",

    "weakKeys": [
      {
        "key": "single character from the data",
        "errorRate": number between 0.0-1.0 (from data: errors/attempts),
        "errors": exact error count from data,
        "attempts": exact attempt count from data,
        "issue": "X errors over Y attempts (use exact numbers from data)",
        "reason": "Specific explanation: Why is this key problematic? Consider finger placement (pinky for 'z', index for 'k'), keyboard position, or muscle memory. Be specific to THIS key.",
        "coachingTip": "Concrete practice advice for this specific key. Example: 'Practice typing words like kind, keep, ask' or 'Do 5-minute drills focusing on n-k-n transitions'"
      }
    ],

    "weakWords": [
      {
        "word": "exact word from data",
        "errorRate": decimal from data (can be > 1.0),
        "attempts": number from data,
        "typedSentence": "exact typedSentence from data",
        "correctSentence": "exact correctSentence from data",
        "totalTime": number in milliseconds from data,
        "avgTime": number in milliseconds from data,
        "reason": "Why is this word difficult? Consider: 1) Error rate (high errors = finger confusion), 2) Typing time (>2000ms = hesitation), 3) Specific letter combinations (like 'nv', 'dk', 'ct'). Reference BOTH speed and accuracy.",
        "coachingTip": "Specific practice method. If time is slow: 'Practice typing this word 20 times, starting slow and building speed'. If errors are high: 'Break into segments: con-ver-sa-tion'. Mention the avgTime if relevant."
      }
    ],

    "practiceAdvice": [
      "3-5 specific recommendations based on actual data patterns",
      "Address the highest error rate keys first",
      "Mention time-based improvements for slow words (e.g., 'Work on reducing your 3+ second words to under 2 seconds')",
      "Suggest progressive difficulty based on their specific weak areas",
      "Include both accuracy-focused and speed-focused practice"
    ],

    "motivation": "Personalized encouragement that acknowledges their specific challenges (mention actual keys/words or patterns) and emphasizes that targeted practice will lead to improvement"
  }

  CRITICAL RULES:
  1. Use ONLY keys and words present in the provided data - never invent examples
  2. For weakKeys: errorRate must be between 0.0 and 1.0 (calculate as errors ÷ attempts)
  3. For weakWords: include both totalTime and avgTime from the data
  4. When avgTime > 2000ms, mention speed as a concern in the reason
  5. When avgTime > 3000ms, strongly emphasize speed practice in coachingTip
  6. Reference actual numbers from the data (e.g., "Your 12 errors on 'k' key")
  7. Keep all text concise, specific, and actionable
  8. If user has only keys OR only words, focus all advice on what exists
  9. Return ONLY the JSON object with no markdown code blocks or extra formatting

  TIMING INTERPRETATION:
  - avgTime < 1000ms: Fast/fluent
  - avgTime 1000-2000ms: Normal pace
  - avgTime 2000-3000ms: Slow/hesitant
  - avgTime > 3000ms: Very slow, needs significant practice
  `;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      response_format: { type: "json_object" },
    });

    const raw = res.choices[0].message.content!;
    const data = JSON.parse(raw);

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to generate exercise" },
      { status: 500 }
    );
  }
}
