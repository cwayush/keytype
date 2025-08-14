import prisma from '../../config/prismaClient';

export const userDao = {
  async createUser(data: any) {
    return await prisma.user.create({ data });
  },

  async checkUserExist(id: string) {
    const count = await prisma.user.count({ where: { id } });
    return count > 0;
  },

  async updateUser(id: string, data: any) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  async getUserbyID(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async deleteUser(id: string) {
    return await prisma.user.delete({ where: { id } });
  },

  async getAllUsers() {
    return await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  },
};
