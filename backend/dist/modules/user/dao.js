"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDao = void 0;
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
exports.userDao = {
    async createUser(data) {
        return await prismaClient_1.default.user.create({ data });
    },
    async checkUserExist(id) {
        const count = await prismaClient_1.default.user.count({ where: { id } });
        return count > 0;
    },
    async updateUser(id, data) {
        return await prismaClient_1.default.user.update({
            where: { id },
            data,
        });
    },
    async getUserbyID(id) {
        return await prismaClient_1.default.user.findUnique({ where: { id } });
    },
    async getUserByEmail(email) {
        return await prismaClient_1.default.user.findUnique({ where: { email } });
    },
    async deleteUser(id) {
        return await prismaClient_1.default.user.delete({ where: { id } });
    },
    async getAllUsers() {
        return await prismaClient_1.default.user.findMany({ orderBy: { createdAt: 'desc' } });
    },
};
//# sourceMappingURL=dao.js.map