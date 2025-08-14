import * as Express from 'express';
import { userRoute } from '../modules/user/handler';
import { testRoutes } from '../modules/test/handler';
import { roomRoute } from '../modules/room/handler';

export const initRoutes = (app: Express.Application): void => {
  const router = Express.Router();

  userRoute(router);
  testRoutes(router);
  roomRoute(router);

  app.use('/', router);
};
