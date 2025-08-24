import Redis from 'ioredis';

const URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(URL);
