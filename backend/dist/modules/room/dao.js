"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomDao = void 0;
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
exports.roomDao = {
    async createRoom(data) {
        return await prismaClient_1.default.room.create({ data });
    },
    async getAllRoom() {
        return await prismaClient_1.default.room.findMany({
            select: {
                id: true,
                code: true,
                name: true,
                mode: true,
                modeOption: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    },
    async getRoomByCode(code) {
        return await prismaClient_1.default.room.findUnique({
            where: { code },
            select: {
                id: true,
                code: true,
                name: true,
                mode: true,
                modeOption: true,
            },
        });
    },
};
//# sourceMappingURL=dao.js.map