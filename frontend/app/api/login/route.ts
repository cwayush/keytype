import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/dboper/user";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  if (!user.emailVerified) {
    return NextResponse.json(
      { success: false, message: "Email not verified" },
      { status: 403 }
    );
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Logged in successfully",
  });
}
