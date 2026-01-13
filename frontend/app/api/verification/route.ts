import { NextResponse } from "next/server";
import prisma from "@repo/db";
import { getUserByEmail } from "@/dboper/user";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({
      success: false,
      message: "Missing Token",
    });
  }

  const tokenValid = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!tokenValid) {
    return NextResponse.json({
      success: false,
      message: "Invalid Token",
    });
  }

  if (new Date(tokenValid.expiresAt) < new Date()) {
    return NextResponse.json({
      success: false,
      message: "Token Expired",
    });
  }

  const existingUser = await getUserByEmail(tokenValid.email);

  if (!existingUser) {
    return NextResponse.json({
      success: false,
      message: "User Not Found",
    });
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { id: tokenValid.id },
  });

  return NextResponse.json({
    success: true,
    message: "Email verified successfully",
  });
}
