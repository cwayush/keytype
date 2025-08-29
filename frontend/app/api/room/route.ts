import { NextRequest, NextResponse } from 'next/server';
import { roomSchema } from '@/config/zvalidate';
import { geneateRoomCode } from '@/lib/utils';
import { auth } from '@/option';
import prisma from '@repo/db';

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session || !session?.user || !session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized: No valid session found' },
        { status: 401 }
      );
    }
    const data = await req.json();
    const validation = roomSchema.safeParse(data);

    if (!validation.success) {
      return NextResponse.json(validation.error.issues, { status: 400 });
    }

    const { name, mode, modeOption } = validation.data;

    const roomCode = geneateRoomCode();

    const room = await prisma.room.create({
      data: {
        code: roomCode,
        name,
        mode,
        modeOption: modeOption,
        userId: session?.user?.id,
      },
    });
    return NextResponse.json(room, { status: 201 });
  } catch (err) {
    console.error('Error creating room:', err);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log(rooms);
    return NextResponse.json(rooms, { status: 200 });
  } catch (err) {
    console.error('Error fetching rooms:', err);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
};
