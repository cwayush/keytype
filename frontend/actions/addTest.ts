import { AddTestTypes } from "./type";

export const addTest = async (data: AddTestTypes) => {
  try {
    const test = await fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return test;
  } catch (err) {
    console.error("Error adding test:", err);
    throw err;
  }
};
