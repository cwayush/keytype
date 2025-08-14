"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const error_1 = require("../../constants/error");
const logger_2 = require("../../constants/logger");
const zvalidate_1 = require("../../config/zvalidate");
const dao_1 = require("./dao");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.userService = {
    async createUser(value) {
        try {
            const validation = zvalidate_1.signUpSchema.safeParse(value);
            if (!validation.success) {
                const errorMessages = validation.error.issues
                    .map((issue) => issue.message)
                    .join(', ');
                throw new Error(errorMessages);
            }
            const { name, email, password } = validation.data;
            const existingUser = await dao_1.userDao.getUserByEmail(email);
            if (existingUser) {
                throw new Error(error_1.ERR_MESSAGES.USER.USER_EXISTS);
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.CREATE_REQUEST);
            const result = await dao_1.userDao.createUser({
                name,
                email,
                password: hashedPassword,
            });
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.CREATED);
            return result;
        }
        catch (err) {
            logger_1.default.error(err.message || error_1.ERR_MESSAGES.USER.CREATE_FAILED);
            throw new Error(err.message || error_1.ERR_MESSAGES.USER.CREATE_FAILED);
        }
    },
    async updateUser(id, data) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.UPDATE_REQUEST);
            const result = await dao_1.userDao.updateUser(id, data);
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.UPDATED);
            return result;
        }
        catch (error) {
            logger_1.default.error(error_1.ERR_MESSAGES.USER.UPDATE_FAILED, error);
            throw new Error(error_1.ERR_MESSAGES.USER.UPDATE_FAILED);
        }
    },
    async getUserByID(id) {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.FETCH_BY_ID_REQUEST);
            const result = await dao_1.userDao.getUserbyID(id);
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.FETCH_BY_ID_SUCCESS);
            return result;
        }
        catch (error) {
            logger_1.default.error(error_1.ERR_MESSAGES.USER.FETCH_BY_ID_FAILED, error);
            throw new Error(error_1.ERR_MESSAGES.USER.FETCH_BY_ID_FAILED);
        }
    },
    async getUsers() {
        try {
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.FETCH_REQUEST);
            const result = await dao_1.userDao.getAllUsers();
            logger_1.default.info(logger_2.LOG_MESSAGES.USER.FETCHED);
            return result;
        }
        catch (error) {
            logger_1.default.error(error_1.ERR_MESSAGES.USER.FETCH_FAILED, error);
            throw new Error(error_1.ERR_MESSAGES.USER.FETCH_FAILED);
        }
    },
};
//# sourceMappingURL=service.js.map