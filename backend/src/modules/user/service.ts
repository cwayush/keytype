import logger from '../../config/logger';
import { ERR_MESSAGES } from '../../constants/error';
import { LOG_MESSAGES } from '../../constants/logger';
import { SignUpInput, signUpSchema } from '../../config/zvalidate';
import { userDao } from './dao';
import bcrypt from 'bcryptjs';

export const userService = {
  async createUser(value: SignUpInput) {
    try {
      const validation = signUpSchema.safeParse(value);
      if (!validation.success) {
        const errorMessages = validation.error.issues
          .map((issue) => issue.message)
          .join(', ');
        throw new Error(errorMessages);
      }

      const { name, email, password } = validation.data;

      const existingUser = await userDao.getUserByEmail(email);
      if (existingUser) {
        throw new Error(ERR_MESSAGES.USER.USER_EXISTS);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      logger.info(LOG_MESSAGES.USER.CREATE_REQUEST);
      const result = await userDao.createUser({
        name,
        email,
        password: hashedPassword,
      });
      logger.info(LOG_MESSAGES.USER.CREATED);

      return result;
    } catch (err: any) {
      logger.error(err.message || ERR_MESSAGES.USER.CREATE_FAILED);
      throw new Error(err.message || ERR_MESSAGES.USER.CREATE_FAILED);
    }
  },

  async updateUser(id: string, data: any) {
    try {
      logger.info(LOG_MESSAGES.USER.UPDATE_REQUEST);
      const result = await userDao.updateUser(id, data);
      logger.info(LOG_MESSAGES.USER.UPDATED);
      return result;
    } catch (error) {
      logger.error(ERR_MESSAGES.USER.UPDATE_FAILED, error);
      throw new Error(ERR_MESSAGES.USER.UPDATE_FAILED);
    }
  },

  async getUserByID(id: string) {
    try {
      logger.info(LOG_MESSAGES.USER.FETCH_BY_ID_REQUEST);
      const result = await userDao.getUserbyID(id);
      logger.info(LOG_MESSAGES.USER.FETCH_BY_ID_SUCCESS);
      return result;
    } catch (error) {
      logger.error(ERR_MESSAGES.USER.FETCH_BY_ID_FAILED, error);
      throw new Error(ERR_MESSAGES.USER.FETCH_BY_ID_FAILED);
    }
  },

  async getUsers() {
    try {
      logger.info(LOG_MESSAGES.USER.FETCH_REQUEST);
      const result = await userDao.getAllUsers();
      logger.info(LOG_MESSAGES.USER.FETCHED);
      return result;
    } catch (error) {
      logger.error(ERR_MESSAGES.USER.FETCH_FAILED, error);
      throw new Error(ERR_MESSAGES.USER.FETCH_FAILED);
    }
  },
};
