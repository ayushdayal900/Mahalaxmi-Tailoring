const logger = require('./utils/logger');

console.log('--- Testing Logger ---');

// Test Info Log
logger.info('This is an INFO log from the test script.');

// Test Error Log
logger.error('This is an ERROR log from the test script.');

// Test HTTP Log
logger.http('GET /test-logger 200 15ms');

console.log('--- Logger Test Complete ---');
console.log('Check your terminal output. If CLOUDWATCH_GROUP_NAME is set, check AWS Console > CloudWatch > Log groups.');
