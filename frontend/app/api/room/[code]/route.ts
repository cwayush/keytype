import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../backend/src/config/prismaClient';

export const GET = async (
  req: NextRequest,
  { params }: { params: { code: string } }
) => {
  try {
    const { code } = params;
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
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (err) {
    console.error('Error fetching room:', err);
    return NextResponse.json(
      { error: 'Failed to fetch room' },
      { status: 500 }
    );
  }
};
