import { clsx, type ClassValue } from 'clsx';
import { generate } from 'random-words';
import { twMerge } from 'tailwind-merge';
import { Test } from '../constants/type';
import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from '@/dboper/token';
import prisma from '@repo/db';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomWords = (length: number) => {
  const words = generate({ exactly: length, join: ' ' });
  return words;
};

export const calculateWPM = (totalCharacter: number, timePassed: number) => {
  const minutes = timePassed / 60;
  const wordsTyped = totalCharacter / 5;

  if (minutes === 0 || totalCharacter === 0) return 0;

  const wpm = Math.round(wordsTyped / minutes);
  return wpm;
};

export const calculateAccuracy = (userInput: string, text: string) => {
  if (userInput.length === 0) return 0;

  const correctChars = userInput
    .split('')
    .filter((char, index) => char === text[index]).length;
  const accuracy = (correctChars / userInput.length) * 100;

  return accuracy;
};

export const calculateTotalTypingTime = (tests: Test[]): string => {
  const totalSeconds = tests.reduce((sum, test) => sum + test.time, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// TODO: check this function
export const getRecentTests = (tests: Test[]) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return tests
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 7)
    .map((test) => ({
      date: daysOfWeek[new Date(test.createdAt).getDay()],
      wpm: test.wpm,
    }));
};

export const getAllTimeBestScores = (tests: Test[]) => {
  const bestScores = {
    time: {
      '15s': 0,
      '30s': 0,
    },
    words: {
      '10': 0,
      '25': 0,
      '50': 0,
    },
  };

  tests.forEach((test) => {
    if (test.mode === 'time' && test.modeOption === 15) {
      bestScores.time['15s'] = Math.max(bestScores.time['15s'], test.wpm);
    }
    if (test.mode === 'time' && test.modeOption === 30) {
      bestScores.time['30s'] = Math.max(bestScores.time['30s'], test.wpm);
    }
    if (test.mode === 'words' && test.modeOption === 10) {
      bestScores.words['10'] = Math.max(bestScores.words['10'], test.wpm);
    }
    if (test.mode === 'words' && test.modeOption === 25) {
      bestScores.words['25'] = Math.max(bestScores.words['25'], test.wpm);
    }
    if (test.mode === 'words' && test.modeOption === 50) {
      bestScores.words['50'] = Math.max(bestScores.words['50'], test.wpm);
    }
  });

  return bestScores;
};

export const geneateRoomCode = () => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exisitingToken = await getVerificationTokenByEmail(email);

  if (exisitingToken) {
    await prisma.verificationToken.delete({
      where: { id: exisitingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      expiresAt: expires,
      email,
    },
  });

  return verificationToken;
};
