"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const logger_2 = require("../../constants/logger");
const service_1 = require("./service");
const response_1 = require("../../constants/response");
exports.testController = {
    async createTest(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.CREATE_REQUEST);
            const result = await service_1.testService.createTest(req.body);
            return res
                .status(response_1.HTTP_STATUS.CREATED)
                .json({ message: response_1.MESSAGES.CREATED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    async getAllTest(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.FETCH_REQUEST);
            const result = await service_1.testService.getAllTest(req.params.userId);
            return res
                .status(response_1.HTTP_STATUS.OK)
                .json({ message: response_1.MESSAGES.FETCHED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    async allTestCount(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.TEST.COUNT_REQUEST);
            const result = await service_1.testService.allTestCount();
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