"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoute = void 0;
const routes_1 = require("../../constants/routes");
const controller_1 = require("./controller");
const roomRoute = (router) => {
    router.post(routes_1.ROUTES.ROOM.CREATE, controller_1.roomController.createRoom);
    router.get(routes_1.ROUTES.ROOM.GET_ALL, controller_1.roomController.getAllRooms);
    router.get(routes_1.ROUTES.ROOM.FETCH_BY_CODE, controller_1.roomController.getRoomByCode);
};
exports.roomRoute = roomRoute;
//# sourceMappingURL=handler.js.map