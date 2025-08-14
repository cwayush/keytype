"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const logger_2 = require("../../constants/logger");
const error_1 = require("../../constants/error");
const dao_1 = require("./dao");
exports.roomService = {
    async createRoom(data) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.CREATE_REQUEST);
            const result = await dao_1.roomDao.createRoom(data);
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.CREATED);
            return result;
        }
        catch (err) {
            logger_1.default.error(error_1.ERR_MESSAGES.ROOM.CREATE_FAILED, err);
            throw new Error(error_1.ERR_MESSAGES.ROOM.CREATE_FAILED);
        }
    },
    async getAllRooms() {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.FETCH_REQUEST);
            const result = await dao_1.roomDao.getAllRoom();
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.FETCHED);
            return result;
        }
        catch (err) {
            logger_1.default.error(error_1.ERR_MESSAGES.ROOM.FETCH_FAILED, err);
            throw new Error(error_1.ERR_MESSAGES.ROOM.FETCH_FAILED);
        }
    },
    async getRoomByCode(code) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.FETCH_BY_CODE_REQUEST);
            const result = await dao_1.roomDao.getRoomByCode(code);
            logger_1.default.info(logger_2.LOG_MESSAGES.ROOM.FETCH_BY_CODE_SUCCESS);
            return result;
        }
        catch (err) {
            logger_1.default.error(error_1.ERR_MESSAGES.ROOM.FETCH_BY_CODE_FAILED, err);
            throw new Error(error_1.ERR_MESSAGES.ROOM.FETCH_BY_CODE_FAILED);
        }
    },
};
//# sourceMappingURL=service.js.map