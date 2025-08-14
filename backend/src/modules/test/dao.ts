import prisma from '../../config/prismaClient';

export const testDao = {
  async createTest(data: any) {
    return await prisma.test.create({ data });
  },

  async getAllTest(userId: string) {
    return await prisma.test.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async allTestCount() {
    return await prisma.test.count();
  },
};
