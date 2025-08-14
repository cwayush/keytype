import { Request, Response, NextFunction } from 'express';
import logger from '../../config/logger';
import { LOG_MESSAGES } from '../../constants/logger';
import { testService } from './service';
import { HTTP_STATUS, MESSAGES } from '../../constants/response';

export const testController = {
  async createTest(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.TEST.CREATE_REQUEST);
      const result = await testService.createTest(req.body);
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: MESSAGES.CREATED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getAllTest(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.TEST.FETCH_REQUEST);
      const result = await testService.getAllTest(req.params.userId);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.FETCHED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },

  async allTestCount(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.TEST.COUNT_REQUEST);
      const result = await testService.allTestCount();
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.FETCHED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },
};
