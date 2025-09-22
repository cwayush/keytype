import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) => {
  try {
    const { code } = await params;

    const room = await prisma.room.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
