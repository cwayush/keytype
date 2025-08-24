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
exports.joinRoomSchema = exports.roomSchema = exports.signUpSchema = exports.signInSchema = void 0;
const z = __importStar(require("zod"));
exports.signInSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});
exports.signUpSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});
exports.roomSchema = z.object({
    name: z.string().min(3, {
        message: "Room name must be at least 3 characters.",
    }),
    mode: z.string().min(1, {
        message: "Please select a mode.",
    }),
    modeOption: z.string().min(1, {
        message: "Please select a mode option.",
    }),
});
exports.joinRoomSchema = z.object({
    code: z.string().min(6, {
        message: "Room code must be 6 characters long.",
    }),
});
//# sourceMappingURL=zvalidate.js.map