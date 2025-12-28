'use server';

import prisma from '@repo/db';
import { auth } from '@/auth';
import OpenAI from 'openai';
import { getWeakKeys } from './errorWords.ts/weakKeys';
import { getWeakWords } from './errorWords.ts/weakWords';

const openai = new OpenAI({
  apiKey:
    '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',
});

export async function generateExercise() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const userId = session.user.id;

  const weakKeys = await getWeakKeys(userId);
  const weakWords = await getWeakWords(userId);

  if (!weakKeys.length) {
    throw new Error('Not enough typing history to generate exercises yet');
  }

  const prompt = `
You are a professional typing coach.

Analyze the user's actual typing performance using the JSON data below.

Provide:
- meaningful analysis
- reasoning based on numbers
- realistic, personalized coaching feedback
- NO generic placeholder text

Use the data EXACTLY as provided.

User Weak Key Data (JSON):
${JSON.stringify(weakKeys, null, 2)}

User Weak Word Data (JSON):
${JSON.stringify(weakWords, null, 2)}

Return ONLY JSON.

Response format:

{
  "summary": "personalized performance insight",

  "weakKeys": [
    {
      "key": "letter",
      "errors": number,
      "attempts": number,
      "errorRate": number,
      "reason": "why user struggles",
      "coachingTip": "specific behavioral fix"
    }
  ],

  "weakWords": [
    {
      "word": "string",
      "attempts": number,
      "errorRate": number,
      "typedSentence": "user typed",
      "correctSentence": "expected sentence",
      "reason": "why mistakes occur",
      "coachingTip": "how to improve"
    }
  ],

  "practiceAdvice": [
    "short actionable guidance",
    "based on real typing behavior"
  ],

  "motivation": "supportive coaching message"
}
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.6,
  });

  let raw = res.choices[0].message.content!.trim();

  raw = raw
    .replace(/^```json/i, '')
    .replace(/^```/, '')
    .replace(/```$/, '')
    .trim();

  const data = JSON.parse(raw);

  return data;
}
