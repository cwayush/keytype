import { Router } from 'express';
import { ROUTES } from '../../constants/routes';
import { roomController } from './controller';

export const roomRoute = (router: Router) => {
  router.post(ROUTES.ROOM.CREATE, roomController.createRoom);
  router.get(ROUTES.ROOM.GET_ALL, roomController.getAllRooms);
  router.get(ROUTES.ROOM.FETCH_BY_CODE, roomController.getRoomByCode);
};
