import NextAuth from 'next-auth';
import { authoption } from '../auth/[...nextauth]/option';
import { NextRequest, NextResponse } from 'next/server';
import { roomSchema } from '@/config/zvalidate';
import { geneateRoomCode } from '@/lib/utils';
import { createRoom, getAllRooms } from '@/services/userService';

export const POST = async (req: NextRequest) => {
  try {
    const session = await NextAuth(authoption);

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

    const room = await createRoom({
      code: roomCode,
      name,
      mode,
      modeOption: modeOption,
      userId: session?.user?.id,
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
    const rooms = await getAllRooms();
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
