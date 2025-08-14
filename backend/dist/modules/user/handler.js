"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const routes_1 = require("../../constants/routes");
const controller_1 = require("./controller");
const userRoute = (router) => {
    router.post(routes_1.ROUTES.USER.SIGNUP, controller_1.userController.signup);
    router.put(routes_1.ROUTES.USER.RESET_PASSWORD, controller_1.userController.updateUser);
    // router.delete(ROUTES.USER.RESET_PASSWORD, userController.deleteUser);
    router.get(routes_1.ROUTES.USER.GET_USER_BY_ID, controller_1.userController.getUserById);
    router.get(routes_1.ROUTES.USER.GET_USERS, controller_1.userController.getUsers);
};
exports.userRoute = userRoute;
//# sourceMappingURL=handler.js.map