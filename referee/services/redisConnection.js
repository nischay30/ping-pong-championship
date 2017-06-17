const redis = require('redis');
const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));

const client = redis.createClient(config.redisPort, config.redisHost);

module.exports = client;
