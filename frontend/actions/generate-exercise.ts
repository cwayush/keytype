export async function generateExercise() {
  const res = await fetch("/api/generate-exercise", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("AI generation failed");
  }

  return res.json();
}
