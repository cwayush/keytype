import logger from '../../config/logger';
import { LOG_MESSAGES } from '../../constants/logger';
import { HTTP_STATUS, MESSAGES } from '../../constants/response';
import { Request, Response, NextFunction } from 'express';
import { roomService } from './service';

export const roomController = {
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.ROOM.CREATE_REQUEST);
      const result = await roomService.createRoom(req.body);
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: MESSAGES.CREATED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.ROOM.FETCH_REQUEST);
      const result = await roomService.getAllRooms();
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.FETCHED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getRoomByCode(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(LOG_MESSAGES.ROOM.FETCH_BY_CODE_REQUEST);
      const result = await roomService.getRoomByCode(req.params.code);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.FETCHED_SUCCESS, data: result });
    } catch (err) {
      next(err);
    }
  },
};
