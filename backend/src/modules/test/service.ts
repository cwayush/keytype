import logger from '../../config/logger';
import { LOG_MESSAGES } from '../../constants/logger';
import { ERR_MESSAGES } from '../../constants/error';
import { testDao } from './dao';

export const testService = {
  async createTest(data: any) {
    try {
      logger.info(LOG_MESSAGES.TEST.CREATE_REQUEST);
      const result = await testDao.createTest(data);
      logger.info(LOG_MESSAGES.TEST.CREATED);
      return result;
    } catch (err) {
      logger.error(ERR_MESSAGES.TEST.CREATE_FAILED, err);
      throw new Error(ERR_MESSAGES.TEST.CREATE_FAILED);
    }
  },

  async getAllTest(userId: string) {
    try {
      logger.info(LOG_MESSAGES.TEST.FETCH_REQUEST);
      const result = await testDao.getAllTest(userId);
      logger.info(LOG_MESSAGES.TEST.FETCHED);
      return result;
    } catch (err) {
      logger.error(ERR_MESSAGES.TEST.FETCH_FAILED, err);
      throw new Error(ERR_MESSAGES.TEST.FETCH_FAILED);
    }
  },

  async allTestCount() {
    try {
      logger.info(LOG_MESSAGES.TEST.COUNT_REQUEST);
      const result = await testDao.allTestCount();
      logger.info(LOG_MESSAGES.TEST.COUNT_FETCHED);
      return result;
    } catch (err) {
      logger.error(ERR_MESSAGES.TEST.COUNT_FAILED, err);
      throw new Error(ERR_MESSAGES.TEST.COUNT_FAILED);
    }
  },
};
