'use server';

import { getVerificationTokenByToken } from '@/dboper/token';
import { getUserByEmail } from '@/dboper/user';
import prisma from '../../backend/src/config/prismaClient';

export const verification = async (token: string) => {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken) {
    return { success: false, message: 'Invalid Token' };
  }

  const tokenExpired = new Date(exisitingToken.expiresAt) < new Date();

  if (tokenExpired) {
    return { success: false, message: 'Token Expired' };
  }

  const existingUser = await getUserByEmail(exisitingToken.email);

  if (!existingUser) {
    return { success: false, message: 'User Not Found' };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: exisitingToken.email },
  });

  await prisma.verificationToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: true, message: 'User Verified' };
};
