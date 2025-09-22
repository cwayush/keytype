import WebSocket from "ws";
import type { User } from "../type";

export class UserManager {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  addUser(
    userId: string,
    ws: WebSocket,
    userData?: { name: string; image: string },
  ) {
    const user = {
      userId,
      name: userData?.name || "Anonymous",
      image: userData?.image || "",
      ws,
      rooms: [],
    };
    this.users.set(userId, user);
  }

  getUser(userId: string) {
    return this.users.get(userId);
  }

  removeUser(userId: string) {
    this.users.delete(userId);
  }

  getUserByWs(ws: WebSocket): [string, User] | null {
    for (const [userId, user] of this.users.entries()) {
      if (user.ws === ws) return [userId, user];
    }
    return null;
  }

  addUserInRoom(userId: string, roomId: string) {
    const user = this.users.get(userId);
    if (user && !user.rooms.includes(roomId)) {
      user.rooms.push(roomId);
    }
  }

  getUserInRoom(roomId: string) {
    return Array.from(this.users.values()).filter((user) =>
      user.rooms.includes(roomId),
    );
  }

  getAllUsers() {
    return Array.from(this.users.values());
  }

  getUserCount() {
    return this.users.size;
  }
}
