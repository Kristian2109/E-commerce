const redis = require("redis");

const redisClient = redis.createClient();

redisClient.connect(() => {
    console.log("Redis database running!");
});

module.exports = redisClient;