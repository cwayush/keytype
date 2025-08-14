"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomController = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const logger_2 = require("../../constants/logger");
const response_1 = require("../../constants/response");
const service_1 = require("./service");
exports.roomController = {
    async createRoom(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.CREATE_REQUEST);
            const result = await service_1.roomService.createRoom(req.body);
            return res
                .status(response_1.HTTP_STATUS.CREATED)
                .json({ message: response_1.MESSAGES.CREATED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    async getAllRooms(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.FETCH_REQUEST);
            const result = await service_1.roomService.getAllRooms();
            return res
                .status(response_1.HTTP_STATUS.OK)
                .json({ message: response_1.MESSAGES.FETCHED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    async getRoomByCode(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.FETCH_BY_CODE_REQUEST);
            const result = await service_1.roomService.getRoomByCode(req.params.code);
            return res
                .status(response_1.HTTP_STATUS.OK)
                .json({ message: response_1.MESSAGES.FETCHED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=controller.js.map