import { AddLead, Filter } from "./type";

export const fetchLeaderboard = async ({
  selectedMode,
  timeFrame,
  limit = 10,
}: Filter) => {
  try {
    const res = await fetch(
      `/api/leaderboard?mode=${selectedMode}&timeFrame=${timeFrame}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch leaderboard");
    }

    const data = await res.json();

    return Array.isArray(data.leaderboard) ? data.leaderboard : [];
  } catch (err) {
    console.error("Leaderboard fetch failed:", err);
    return [];
  }
};

export const addScoreToLeaderboard = async ({
  wpm,
  accuracy,
  time,
  mode,
  modeOption,
}: AddLead) => {
  if (!wpm || !accuracy || !time || !mode) return null;

  try {
    const res = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        wpm,
        accuracy: Number(accuracy.toFixed?.(2) ?? accuracy),
        time,
        mode,
        modeOption,
      }),
    });

    if (!res.ok) {
      console.error("Leaderboard API failed", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Error adding leaderboard entry:", err);
    return null;
  }
};
