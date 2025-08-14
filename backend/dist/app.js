"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./config/logger"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Request logging middleware
app.use((req, res, next) => {
    logger_1.default.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        params: req.params,
        query: req.query,
    });
    next();
});
// Routes
(0, routes_1.initRoutes)(app);
logger_1.default.info(`Server initialized successfully in ${process.env.NODE_ENV || 'development'} mode`);
exports.default = app;
//# sourceMappingURL=app.js.map