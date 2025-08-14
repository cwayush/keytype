import { Router } from 'express';
import { ROUTES } from '../../constants/routes';
import { testController } from './controller';

export const testRoutes = (router: Router) => {
  router.post(ROUTES.TEST.CREATE, testController.createTest);
  router.get(ROUTES.TEST.GET_ALL, testController.getAllTest);
  router.get(ROUTES.TEST.COUNT, testController.allTestCount);
};
