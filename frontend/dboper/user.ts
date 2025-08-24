import prisma from '../../backend/src/config/prismaClient';


export const getUserByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const getUserById = async (id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  