import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@repo/db";
import { getUserByEmail } from "@/dboper/user";
import { generateVerificationToken } from "@/lib/utils";
import { sendVerificationEmail } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json(
      {
        success: true,
        message: "Confirmation email sent",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register API error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
