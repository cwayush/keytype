import prisma from '../../config/prismaClient';

export const roomDao = {
  async createRoom(data: any) {
    return await prisma.room.create({ data });
  },

  async getAllRoom() {
    return await prisma.room.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getRoomByCode(code: string) {
    return await prisma.room.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
    });
  },
};
