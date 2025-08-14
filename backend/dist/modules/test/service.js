"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testService = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const logger_2 = require("../../constants/logger");
const error_1 = require("../../constants/error");
const dao_1 = require("./dao");
exports.testService = {
    async createTest(data) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.CREATE_REQUEST);
            const result = await dao_1.testDao.createTest(data);
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.CREATED);
            return result;
        }
        catch (err) {
            logger_1.default.error(error_1.ERR_MESSAGES.TEST.CREATE_FAILED, err);
            throw new Error(error_1.ERR_MESSAGES.TEST.CREATE_FAILED);
        }
    },
    async getAllTest(userId) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.FETCH_REQUEST);
            const result = await dao_1.testDao.getAllTest(userId);
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.FETCHED);
            return result;
        }
        catch (err) {
            logger_1.default.error(error_1.ERR_MESSAGES.TEST.FETCH_FAILED, err);
            throw new Error(error_1.ERR_MESSAGES.TEST.FETCH_FAILED);
        }
    },
    async allTestCount() {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.COUNT_REQUEST);
            const result = await dao_1.testDao.allTestCount();
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.COUNT_FETCHED);
            return result;
        }
        catch (err) {
            logger_1.default.error(error_1.ERR_MESSAGES.TEST.COUNT_FAILED, err);
            throw new Error(error_1.ERR_MESSAGES.TEST.COUNT_FAILED);
        }
    },
};
//# sourceMappingURL=service.js.map