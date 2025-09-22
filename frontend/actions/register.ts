"use server";

import { signUpSchema, SignUpInput } from "@/config/zvalidate";
import { generateVerificationToken } from "@/lib/utils";
import { sendVerificationEmail } from "@/lib/resend";
import { getUserByEmail } from "@/dboper/user";
import bcrypt from "bcryptjs";
import prisma from "@repo/db";

export const register = async (values: SignUpInput) => {
  const validation = signUpSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }

  const { name, email, password } = validation.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: true, message: "Confirmation email sent" };
};
