import logger from '../../config/logger';
import { LOG_MESSAGES } from '../../constants/logger';
import { ERR_MESSAGES } from '../../constants/error';
import { roomDao } from './dao';

export const roomService = {
  async createRoom(data: any) {
    try {
      logger.info(LOG_MESSAGES.ROOM.CREATE_REQUEST);
      const result = await roomDao.createRoom(data);
      logger.info(LOG_MESSAGES.ROOM.CREATED);
      return result;
    } catch (err) {
      logger.error(ERR_MESSAGES.ROOM.CREATE_FAILED, err);
      throw new Error(ERR_MESSAGES.ROOM.CREATE_FAILED);
    }
  },

  async getAllRooms() {
    try {
      logger.info(LOG_MESSAGES.ROOM.FETCH_REQUEST);
      const result = await roomDao.getAllRoom();
      logger.info(LOG_MESSAGES.ROOM.FETCHED);
      return result;
    } catch (err) {
      logger.error(ERR_MESSAGES.ROOM.FETCH_FAILED, err);
      throw new Error(ERR_MESSAGES.ROOM.FETCH_FAILED);
    }
  },

  async getRoomByCode(code: string) {
    try {
      logger.info(LOG_MESSAGES.ROOM.FETCH_BY_CODE_REQUEST);
      const result = await roomDao.getRoomByCode(code);
      logger.info(LOG_MESSAGES.ROOM.FETCH_BY_CODE_SUCCESS);
      return result;
    } catch (err) {
      logger.error(ERR_MESSAGES.ROOM.FETCH_BY_CODE_FAILED, err);
      throw new Error(ERR_MESSAGES.ROOM.FETCH_BY_CODE_FAILED);
    }
  },
};
