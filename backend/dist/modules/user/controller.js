"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const service_1 = require("./service");
const logger_1 = __importDefault(require("../../config/logger"));
const logger_2 = require("../../constants/logger");
const response_1 = require("../../constants/response");
exports.userController = {
    async signup(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.CREATE_REQUEST);
            const result = await service_1.userService.createUser(req.body);
            return res
                .status(response_1.HTTP_STATUS.CREATED)
                .json({ message: response_1.MESSAGES.CREATED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    async updateUser(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.UPDATE_REQUEST);
            const result = await service_1.userService.updateUser(req.params.id, req.body);
            return res
                .status(response_1.HTTP_STATUS.OK)
                .json({ message: response_1.MESSAGES.UPDATED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    // async deleteUser(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     logger.info(LOG_MESSAGES.USER.DELETE_REQUEST);
    //     const result = await userService.deleteUser(req.params.id);
    //     return res
    //       .status(HTTP_STATUS.OK)
    //       .json({ message: MESSAGES.DELETED_SUCCESS, data: result });
    //   } catch (err) {
    //     next(err);
    //   }
    // },
    async getUserById(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.FETCH_BY_ID_REQUEST);
            const result = await service_1.userService.getUserByID(req.params.id);
            return res
                .status(response_1.HTTP_STATUS.OK)
                .json({ message: response_1.MESSAGES.FETCHED_SUCCESS, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    async getUsers(req, res, next) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.FETCH_REQUEST);
            const result = await service_1.userService.getUsers();
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