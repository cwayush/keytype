"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
class UserManager {
    constructor() {
        this.users = new Map();
    }
    addUser(userId, ws, userData) {
        const user = {
            userId,
            name: (userData === null || userData === void 0 ? void 0 : userData.name) || "Anonymous",
            image: (userData === null || userData === void 0 ? void 0 : userData.image) || "",
            ws,
            rooms: [],
        };
        this.users.set(userId, user);
    }
    getUser(userId) {
        return this.users.get(userId);
    }
    removeUser(userId) {
        this.users.delete(userId);
    }
    getUserByWs(ws) {
        for (const [userId, user] of this.users.entries()) {
            if (user.ws === ws)
                return [userId, user];
        }
        return null;
    }
    addUserInRoom(userId, roomId) {
        const user = this.users.get(userId);
        if (user && !user.rooms.includes(roomId)) {
            user.rooms.push(roomId);
        }
    }
    getUserInRoom(roomId) {
        return Array.from(this.users.values()).filter((user) => user.rooms.includes(roomId));
    }
    getAllUsers() {
        return Array.from(this.users.values());
    }
    getUserCount() {
        return this.users.size;
    }
}
exports.UserManager = UserManager;
