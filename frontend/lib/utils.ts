import { clsx, type ClassValue } from 'clsx';
import { filter } from 'framer-motion/client';
import { generate } from 'random-words';
import { twMerge } from 'tailwind-merge';

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
