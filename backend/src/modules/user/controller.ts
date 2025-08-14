import { Request, Response, NextFunction } from 'express';
import { userService } from './service';
import logger from '../../config/logger';
import { LOG_MESSAGES } from '../../constants/logger';
import { HTTP_STATUS, MESSAGES } from '../../constants/response';

export const userController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.USER.CREATE_REQUEST);
      const result = await userService.createUser(req.body);
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: MESSAGES.CREATED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.USER.UPDATE_REQUEST);
      const result = await userService.updateUser(req.params.id, req.body);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.UPDATED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },

  // async deleteUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     logger.info(LOG_MESSAGES.USER.DELETE_REQUEST);
  //     const result = await userService.deleteUser(req.params.id);
  //     return res
  //       .status(HTTP_STATUS.OK)
  //       .json({ message: MESSAGES.DELETED_SUCCESS, data: result });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.USER.FETCH_BY_ID_REQUEST);
      const result = await userService.getUserByID(req.params.id);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.FETCHED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.USER.FETCH_REQUEST);
      const result = await userService.getUsers();
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.FETCHED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },
};
