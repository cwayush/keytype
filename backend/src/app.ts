import express from 'express';
import cors from 'cors';
import logger from './config/logger';
import { initRoutes } from './routes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    params: req.params,
    query: req.query,
  });
  next();
});

// Routes
initRoutes(app);

logger.info(
  `Server initialized successfully in ${
    process.env.NODE_ENV || 'development'
  } mode`
);

export default app;
