import { Router } from 'express';
import { ROUTES } from '../../constants/routes';
import { userController } from './controller';

export const userRoute = (router: Router) => {
  router.post(ROUTES.USER.SIGNUP, userController.signup);
  router.post(ROUTES.USER.LOGIN, userController.userLogin);
  router.put(ROUTES.USER.RESET_PASSWORD, userController.updateUser);
  // router.delete(ROUTES.USER.RESET_PASSWORD, userController.deleteUser);
  router.get(ROUTES.USER.GET_USER_BY_ID, userController.getUserById);
  router.get(ROUTES.USER.GET_USERS, userController.getUsers);
};
