import prisma from "@repo/db";
import { v4 as uuidv4 } from "uuid";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.verificationToken.findFirst({
      where: { email },
      orderBy: { expiresAt: "desc" },
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exisitingToken = await getVerificationTokenByEmail(email);

  if (exisitingToken) {
    await prisma.verificationToken.delete({
      where: { id: exisitingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      expiresAt: expires,
      email,
    },
  });

  return verificationToken;
};
