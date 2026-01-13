import { auth } from "@/auth";
import { getUserByEmail } from "@/dboper/user";
import prisma from "@repo/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const user = await getUserByEmail(session.user.email);
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    const body = await req.json();
    const { wpm, accuracy, time, mode, modeOption } = body;

    if (!wpm || !accuracy || !time || !mode || !modeOption)
      return NextResponse.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 }
      );

    const test = await prisma.test.create({
      data: {
        wpm: Math.round(wpm),
        accuracy: Number(accuracy),
        time: Math.round(time),
        mode,
        modeOption,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Test saved successfully",
        data: { id: test.id },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding test:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save test",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
