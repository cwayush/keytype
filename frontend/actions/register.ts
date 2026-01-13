import { signUpSchema, SignUpInput } from "@/config/zvalidate";

export const register = async (values: SignUpInput) => {
  const validation = signUpSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Registration failed");
  }

  return json;
};
