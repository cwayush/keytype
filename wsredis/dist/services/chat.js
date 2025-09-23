"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWithServer = void 0;
const ws_1 = __importStar(require("ws"));
const user_1 = require("./user");
const redis_1 = require("./redis");
class ChatWithServer {
    // Constructor with httpServer
    constructor(httpServer) {
        this.pubsub = new redis_1.RedisManager();
        this.userManage = new user_1.UserManager();
        this.roomHosts = new Map();
        this.subscribedRooms = new Set();
        this.wsocket = new ws_1.WebSocketServer({ server: httpServer });
        this.wsocket.on("connection", this.handleConnection.bind(this));
        this.setupPubSub();
    }
    // Handle Connection for WebSocket
    handleConnection(ws) {
        ws.on("error", console.error);
        ws.on("message", (data) => this.handleMessage(ws, data));
        ws.on("close", () => this.handleClose(ws));
    }
    // Setup PubSub for Redis
    setupPubSub() {
        this.pubsub.subscriber.on("message", (channel, message) => {
            const parsedMessage = JSON.parse(message);
            const users = this.userManage.getUserInRoom(channel);
            users.forEach((user) => {
                if (user.ws.readyState === ws_1.default.OPEN) {
                    user.ws.send(JSON.stringify(parsedMessage));
                }
            });
        });
    }
    // Handle Room Join for User send message to Redis
    async handleRoomJoin(userId, roomCode) {
        try {
            const user = this.userManage.getUser(userId);
            if (!user)
                throw new Error(`User with ID ${userId} not found!`);
            this.userManage.addUserInRoom(userId, roomCode);
            if (!this.subscribedRooms.has(roomCode)) {
                await this.pubsub.subscribe(roomCode);
                this.subscribedRooms.add(roomCode);
            }
            const tillroomHost = this.roomHosts.has(roomCode);
            if (!tillroomHost) {
                this.roomHosts.set(roomCode, userId);
            }
            const roomMembers = this.userManage
                .getAllUsers()
                .filter((user) => user.rooms.includes(roomCode))
                .map((user) => ({
                id: user.userId,
                name: user.name,
                image: user.image,
                isHost: user.userId === this.roomHosts.get(roomCode),
            }));
            await this.pubsub.publish(roomCode, {
                type: "ROOM_MEMBERS",
                members: roomMembers,
            });
        }
        catch (err) {
            console.error(`Error handling join room for user ${userId}:`, err);
        }
    }
    // Handle Send Message for User send message to Redis
    async handleSendMessage(userId, roomCode, message) {
        try {
            const user = this.userManage.getUser(userId);
            if (!user) {
                throw new Error(`User with ID ${userId}  not found!`);
            }
            await this.pubsub.publish(roomCode, {
                type: "MESSAGE",
                userId,
                message,
                userData: {
                    name: user.name,
                    image: user.image,
                },
            });
        }
        catch (err) {
            console.error("Error Handling send Message:", err);
        }
    }
    // Handle Start Race for User send message to Redis
    async handleStartRace(roomCode, text) {
        try {
            const userInRoom = this.userManage.getUserInRoom(roomCode);
            if (!userInRoom.length) {
                console.error("No users in that room", roomCode);
                return;
            }
            await this.pubsub.publish(roomCode, {
                type: "RACE_START",
                timeStamp: Date.now(),
                text,
            });
        }
        catch (err) {
            console.error("Error Handle in RaceStarting", err);
        }
    }
    // Handle Progress Update for User send message to Redis
    async handleProgressUpdate({ roomCode, userId, progress, }) {
        try {
            const userInRoom = this.userManage.getUserInRoom(roomCode);
            if (!userInRoom.length) {
                console.error("No users in that room for progress update:", roomCode);
            }
            const user = this.userManage.getUser(userId);
            if (!user) {
                console.error("User not found for progress update:", userId);
                return;
            }
            this.pubsub.publish(roomCode, {
                type: "PROGRESS_UPDATE",
                userId,
                progress,
                timeStamp: Date.now(),
            });
        }
        catch (err) {
            console.error("Error Handle in UsersProgressUpdate:", err);
        }
    }
    // Handle Close for User send message to Redis
    async handleClose(ws) {
        const userEntry = this.userManage.getUserByWs(ws);
        if (!userEntry)
            return;
        const [userId, user] = userEntry;
        const rooms = user.rooms;
        for (const roomCode of rooms) {
            // If host left, assign a new host
            if (this.roomHosts.get(roomCode) === userId) {
                const remainingUsers = this.userManage.getUserInRoom(roomCode);
                if (remainingUsers.length > 0 && remainingUsers[0]) {
                    this.roomHosts.set(roomCode, remainingUsers[0].userId);
                }
                else {
                    this.roomHosts.delete(roomCode);
                }
            }
            await this.pubsub.publish(roomCode, {
                type: "MEMBER_LEFT",
                memberId: userId,
            });
            // Unsubscribe if room empty
            const remainingUsers = this.userManage.getUserInRoom(roomCode);
            if (remainingUsers.length === 0) {
                await this.pubsub.unsubscribe(roomCode);
                this.subscribedRooms.delete(roomCode);
                this.roomHosts.delete(roomCode);
            }
            this.userManage.removeUser(userId);
        }
    }
    // Handle Message for User send message to Redis
    async handleMessage(ws, data) {
        try {
            const parseData = JSON.parse(data.toString());
            const { type, userId, roomCode, userData } = parseData;
            if (!this.userManage.getUser(userId)) {
                this.userManage.addUser(userId, ws, userData);
            }
            switch (type) {
                case "JOIN_ROOM":
                    await this.handleRoomJoin(userId, roomCode);
                    break;
                case "SEND_MESSAGE":
                    await this.handleSendMessage(userId, roomCode, userData.message);
                    break;
                case "START_RACE":
                    await this.handleStartRace(roomCode, userData.text);
                    break;
                case "UPDATE_PROGRESS":
                    await this.handleProgressUpdate(userData);
                    break;
                default:
                    console.error("Invalid message type:", type);
            }
        }
        catch (err) {
            console.error("Error Handle in Message:", err);
        }
    }
}
exports.ChatWithServer = ChatWithServer;
