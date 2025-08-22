"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const URL = 'redis://localhost:6379';
const redis = new ioredis_1.default(URL);
class RedisManager {
    constructor() {
        this.publisher = redis;
        this.subscriber = redis;
    }
    async subscribe(channel) {
        try {
            await this.subscriber.subscribe(channel);
        }
        catch (err) {
            console.log(`Error subscribing to channel ${channel}:`, err);
        }
    }
    async unsubscribe(channel) {
        try {
            await this.subscriber.unsubscribe(channel);
        }
        catch (err) {
            console.log(`Error unsubscribing to channel ${channel}:`, err);
        }
    }
    publish(channel, message) {
        try {
            this.publisher.publish(channel, JSON.stringify(message));
        }
        catch (err) {
            console.log(`Error publishing to channel ${channel}:`, err);
        }
    }
    cleanup() {
        this.publisher.disconnect();
        this.subscriber.disconnect();
    }
}
exports.RedisManager = RedisManager;
