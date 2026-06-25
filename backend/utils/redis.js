const { createClient } = require('redis');
const logger = require('./logger');

const redisUrl = process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`;

const redisClient = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                logger.error('Redis reconnection failed. Max retries reached.');
                return new Error('Redis connection lost');
            }
            logger.warn(`Redis reconnecting... Attempt #${retries}`);
            return Math.min(retries * 200, 2000); // Backoff strategy
        }
    }
});

redisClient.on('connect', () => logger.info('🔄 Connecting to Redis...'));
redisClient.on('ready', () => logger.info('DONE:  Redis Connected Successfully'));
redisClient.on('error', (err) => logger.error('ERROR:  Redis Client Error:', err));

// Connect automatically
(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        logger.error('ERROR:  Failed to connect to Redis:', err);
    }
})();

module.exports = redisClient;
