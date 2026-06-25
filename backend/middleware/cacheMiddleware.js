const redisClient = require('../utils/redis');
const logger = require('../utils/logger');

/**
 * Cache middleware generator
 * @param {number} duration - Cache expiration duration in seconds (default: 300s / 5 mins)
 */
const cacheMiddleware = (duration = 300) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Check if Redis is connected
        if (!redisClient.isOpen) {
            return next();
        }

        const key = `cache:${req.originalUrl || req.url}`;

        try {
            const cachedResponse = await redisClient.get(key);
            
            if (cachedResponse) {
                logger.info(`⚡ Cache Hit: ${key}`);
                return res.json(JSON.parse(cachedResponse));
            }

            // Override res.json to capture response and save to Redis
            res.originalJson = res.json;
            res.json = (body) => {
                // If it's a successful response, cache it
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    redisClient.setEx(key, duration, JSON.stringify(body))
                        .catch(err => logger.error('Redis save error:', err));
                }
                res.originalJson(body);
            };

            next();
        } catch (err) {
            logger.error('Redis middleware error:', err);
            next();
        }
    };
};

/**
 * Helper to clear specific cache patterns when data is mutated
 * @param {string} pattern - Redis key pattern (e.g., 'cache:/api/products*')
 */
const clearCache = async (pattern) => {
    if (!redisClient.isOpen) return;
    try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
            logger.info(`🧹 Cleared cache for pattern: ${pattern}`);
        }
    } catch (err) {
        logger.error('Error clearing cache:', err);
    }
};

module.exports = { cacheMiddleware, clearCache };
