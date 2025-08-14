"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDao = void 0;
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
exports.testDao = {
    async createTest(data) {
        return await prismaClient_1.default.test.create({ data });
    },
    async getAllTest(userId) {
        return await prismaClient_1.default.test.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    },
    async allTestCount() {
        return await prismaClient_1.default.test.count();
    },
};
//# sourceMappingURL=dao.js.map