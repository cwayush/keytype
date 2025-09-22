import { NextResponse } from "next/server";
import prisma from "@repo/db";

export const GET = async () => {
  try {
    const totalUsers = await prisma.user.count();
    const totalTests = await prisma.test.count();

    return NextResponse.json([
      { name: "Typers Registered", value: totalUsers },
      { name: "Tests Completed", value: totalTests },
    ]);
  } catch (err) {
    console.error("Error fetching status:", err);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 },
    );
  }
};
