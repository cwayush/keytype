import prisma from "@repo/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.verificationToken.findFirst({
      where: { email },
      orderBy: { expiresAt: 'desc' },
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch (err) {
    console.log(err);
  }
};
