"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoutes = void 0;
const routes_1 = require("../../constants/routes");
const controller_1 = require("./controller");
const testRoutes = (router) => {
    router.post(routes_1.ROUTES.TEST.CREATE, controller_1.testController.createTest);
    router.get(routes_1.ROUTES.TEST.GET_ALL, controller_1.testController.getAllTest);
    router.get(routes_1.ROUTES.TEST.COUNT, controller_1.testController.allTestCount);
};
exports.testRoutes = testRoutes;
//# sourceMappingURL=handler.js.map