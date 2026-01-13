"use client";

import { AnimatePresence, motion } from "framer-motion";
import Result from "./result";
import Modes from "./modes";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  calculateAccuracy,
  calculateWPM,
  cn,
  generateRandomWords,
} from "@/lib/utils";
import { useSession } from "next-auth/react";
import { MousePointer } from "lucide-react";
import { AILoader, GuestPromptCard, ResetButton } from "./reusecomp";
import { addTest } from "@/actions/addTest";
import { processWeak } from "@/actions/weakWords";

const Interface = () => {
  const { data: session } = useSession();

  const [focused, setFocused] = useState(true);
  const [paused, setPaused] = useState(false);

  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });

  const [mode, setMode] = useState<string>("words");
  const [modeOption, setModeOption] = useState<number>(10);

  const [timePassed, setTimePassed] = useState<number>(0);
  const [timeStarted, setTimeStarted] = useState<boolean>(false);
  const [raceStarted, setRaceStarted] = useState<boolean>(false);
  const [raceCompleted, setRaceCompleted] = useState<boolean>(false);

  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpmData, setWpmData] = useState<{ time: number; wpm: number }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const charRef = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const [keystrokes, setKeystrokes] = useState<any[]>([]);

  const wordBufferRef = useRef("");
  const expectedWordRef = useRef("");
  const correctSentence = useRef("");
  const typedSentenceRef = useRef("");
  const wordStartRef = useRef(Date.now());
  const wordErrorsRef = useRef(0);
  const wordStatsRef = useRef<any[]>([]);

  const generateNewText = useCallback(() => {
    let newText;
    if (mode === "words") {
      newText = generateRandomWords(Number(modeOption));
    } else if (mode === "time") {
      newText = generateRandomWords(Number(modeOption * 2));
    } else {
      newText = "This is a placeholder text.";
    }
    setText(newText);
  }, [mode, modeOption]);

  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBlur = () => {
    if (raceCompleted) return;

    pauseTimeoutRef.current = setTimeout(() => {
      setPaused(true);
      setTimeStarted(false);
      setRaceStarted(false);
      setFocused(false);
    }, 500);
  };

  const focusInput = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }

    inputRef.current?.focus();

    setFocused(true);
    setPaused(false);

    if (userInput.length > 0 && !raceCompleted) {
      setRaceStarted(true);
      setTimeStarted(true);
    }
  };

  useEffect(() => {
    const onKeyDown = () => {
      if (!focused && !raceCompleted) {
        focusInput();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focused, raceCompleted]);

  const resetTest = useCallback(() => {
    completedRef.current = false;

    generateNewText();
    setCurrentIndex(0);
    setUserInput("");
    setTimePassed(0);
    setTimeStarted(false);
    setRaceStarted(false);
    setRaceCompleted(false);
    setWpmData([]);
    setMistakes([]);
    setFocused(true);
    setPaused(false);
    setIsProcessing(false);
    setShowGuestPrompt(false);

    setKeystrokes([]);

    wordStatsRef.current = [];
    wordBufferRef.current = "";
    expectedWordRef.current = "";
    correctSentence.current = "";
    typedSentenceRef.current = "";
    wordErrorsRef.current = 0;
    wordStartRef.current = Date.now();

    setCaretPosition({ top: 0, left: 0 });

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }

    inputRef.current?.focus();
  }, [generateNewText]);

  useEffect(() => {
    resetTest();
  }, [mode, modeOption, resetTest]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        resetTest();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetTest]);

  const updateCaretPosition = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < charRef.current.length) {
      const currentChar = charRef.current[currentIndex];
      if (currentChar && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const charRect = currentChar.getBoundingClientRect();

        setCaretPosition({
          top: charRect.top - containerRect.top,
          left: charRect.left - containerRect.left,
        });
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    updateCaretPosition();
  }, [currentIndex, updateCaretPosition]);

  useEffect(() => {
    const handleResize = () => {
      updateCaretPosition();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCaretPosition]);

  useEffect(() => {
    if (userInput.length === 1 && !timeStarted) {
      setRaceStarted(true);
      setTimeStarted(true);
    }
  }, [userInput, timeStarted]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (timeStarted && !raceCompleted && !paused) {
      timer = setInterval(() => {
        setTimePassed((prev) => {
          const newTime = prev + 1;
          if (mode === "time" && newTime >= modeOption) {
            clearInterval(timer!);
            return modeOption;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeStarted, raceCompleted, paused, mode, modeOption]);

  const completeTest = async () => {
    if (completedRef.current) return;
    completedRef.current = true;

    setRaceStarted(false);
    setTimeStarted(false);
    setRaceCompleted(true);

    const finalWpm = calculateWPM(userInput.length, timePassed);
    const finalAccuracy = calculateAccuracy(userInput, text);

    setWpm(finalWpm);
    setAccuracy(finalAccuracy);

    setWpmData((prev) => {
      const lastEntry = prev[prev.length - 1];
      if (!lastEntry || lastEntry.time !== timePassed) {
        return [...prev, { time: timePassed, wpm: finalWpm }];
      }
      return prev;
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!session?.user) {
      setShowGuestPrompt(true);
      return;
    }

    if (session?.user) {
      try {
        setIsProcessing(true);

        await Promise.all([
          addTest({
            wpm: finalWpm,
            accuracy: parseFloat(finalAccuracy.toFixed(2)),
            time: timePassed,
            mode,
            modeOption,
          }),
          processWeak(wordStatsRef.current, keystrokes),
        ]);

        setRaceCompleted(true);
      } catch (err) {
        console.error("Post-test processing failed", err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const hasMistakes = useMemo(() => {
    return mistakes.length > 0;
  }, [mistakes]);

  useEffect(() => {
    if (raceStarted && timePassed > 0 && timePassed % 2 === 0) {
      const currentWpm = calculateWPM(userInput.length, timePassed);
      setWpmData((prev) => {
        const lastEntry = prev[prev.length - 1];
        if (!lastEntry || lastEntry.time !== timePassed) {
          return [...prev, { time: timePassed, wpm: currentWpm }];
        }
        return prev;
      });
    }
  }, [timePassed, raceStarted, userInput.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (raceCompleted) return;

    const newInput = e.target.value;
    const typedChar = newInput[newInput.length - 1];
    const expectedChar = text[newInput.length - 1];

    if (typedChar) {
      setKeystrokes((prev) => {
        if (expectedChar !== typedChar) {
          return [
            ...prev,
            {
              expectedChar,
              typedChar,
              time: Date.now(),
              isCorrect: typedChar === expectedChar,
            },
          ];
        }
        return [...prev];
      });
    }

    if (expectedChar === " ") {
      const duration = Date.now() - wordStartRef.current;

      correctSentence.current += expectedWordRef.current.trim() + " ";
      typedSentenceRef.current += wordBufferRef.current.trim() + " ";

      if (wordBufferRef.current !== expectedWordRef.current) {
        wordStatsRef.current.push({
          word: wordBufferRef.current.trim(),
          expected: expectedWordRef.current.trim(),
          typedSentence: typedSentenceRef.current.trim(),
          correctSentence: correctSentence.current.trim(),
          duration,
          errors: wordErrorsRef.current,
          isCorrect: wordBufferRef.current === expectedWordRef.current,
        });
      }

      wordBufferRef.current = "";
      expectedWordRef.current = "";
      wordErrorsRef.current = 0;
      wordStartRef.current = Date.now();
    } else if (typedChar) {
      wordBufferRef.current += typedChar;
      expectedWordRef.current += expectedChar;

      if (typedChar !== expectedChar) {
        wordErrorsRef.current += 1;
      }
    }

    setUserInput(newInput);

    if (newInput.length < userInput.length) {
      setMistakes((prev) => prev.filter((index) => index !== newInput.length));
    } else if (newInput.length > 0) {
      const lastCharIndex = newInput.length - 1;
      if (newInput[lastCharIndex] !== text[lastCharIndex]) {
        setMistakes((prev) => [...prev, lastCharIndex]);
      }
    }

    if (mode === "time" && timePassed >= modeOption) {
      completeTest();
      return;
    }

    if (newInput.length === text.length) {
      completeTest();
    } else {
      setCurrentIndex(newInput.length);
    }
  };

  const character = useMemo(() => {
    return text.split("").map((char, index) => ({
      id: `${char}-${index}-${text.length}`,
      char,
      status:
        index < currentIndex
          ? mistakes.includes(index)
            ? "error"
            : "correct"
          : "pending",
    }));
  }, [text, currentIndex, mistakes]);

  const accuracyValue = calculateAccuracy(userInput, text);
  const accuracyColor = accuracyValue >= 60 ? "text-green-400" : "text-red-400";

  return (
    <AnimatePresence>
      {!raceCompleted && (
        <motion.div
          key="typing"
          onClick={focusInput}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl px-10 py-6"
        >
          <Modes
            mode={mode}
            setMode={setMode}
            modeOption={modeOption}
            setModeOption={setModeOption}
          />
          <motion.div
            ref={containerRef}
            className="relative md:text-2xl text-lg leading-relaxed tracking-wide mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {!focused && !raceCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
                onClick={focusInput}
              >
                <span className="flex items-center gap-3 md:text-[16px] text-xs md:p-0 p-7 text-neutral-500 tracking-[-0.05em]">
                  <MousePointer className="h-5 w-5" />
                  You lost focus — click here or press any key to continue
                </span>
              </motion.div>
            )}
            <div
              className={cn(
                "transition-all duration-200",
                paused && "blur-[5px] opacity-50 saturate-50"
              )}
            >
              {character.map((char, index) => (
                <motion.span
                  key={char.id}
                  ref={(chr) => {
                    charRef.current[index] = chr;
                  }}
                  className={cn(
                    char.status === "correct" && "text-green-400",
                    char.status === "error" && "text-red-600",
                    char.status === "pending" && "text-neutral-600"
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.01 }}
                >
                  {char.char}
                </motion.span>
              ))}
            </div>

            {focused && !paused && (
              <motion.div
                className="absolute w-[1.5px] md:h-8 h-6 bg-neutral-300 rounded"
                animate={{
                  top: `${caretPosition.top}px`,
                  left: `${caretPosition.left}px`,
                  opacity: [1],
                }}
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 30 },
                  y: { type: "spring", stiffness: 500, damping: 30 },
                  opacity: { duration: 1, repeat: Infinity },
                }}
              />
            )}

            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={userInput}
              className="absolute inset-0 opacity-0 cursor-default"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </motion.div>

          {raceStarted && !paused && (
            <motion.div
              className="mt-15 flex justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="px-2 py-2 text-sm md:inline-block flex flex-col items-center justify-center gap-1 text-white">
                Time: <span className="text-green-400">{timePassed}s</span>
              </span>

              <span className=" px-2 py-2 text-sm md:inline-block flex flex-col  gap-1 text-white">
                WPM:{" "}
                <span className="text-green-400">
                  {calculateWPM(userInput.length, timePassed)}
                </span>
              </span>

              <span className="px-2 py-2 text-sm md:inline-block flex flex-col items-center justify-center gap-1 text-white">
                Accuracy:{" "}
                <span className={accuracyColor}>
                  {accuracyValue.toFixed(2)}%
                </span>
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
      {!raceCompleted && <ResetButton onReset={resetTest} />}

      {raceCompleted && (
        <motion.div
          key="result-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 flex justify-center"
        >
          <div className="pointer-events-auto">
            {showGuestPrompt ? (
              <GuestPromptCard onReset={resetTest} />
            ) : isProcessing ? (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <AILoader message="Finalizing your stats…" />
              </div>
            ) : (
              <Result
                wpm={wpm}
                accuracy={accuracy}
                time={timePassed}
                wpmData={wpmData}
                mode={mode}
                onRestart={resetTest}
                modeOption={modeOption}
                hasMistakes={hasMistakes}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Interface;
