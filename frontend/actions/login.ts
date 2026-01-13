import { signInSchema, SignInInput } from "@/config/zvalidate";

export const loginUser = async (values: SignInInput) => {
  const validation = signInSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  return res.json();
};
