const redis = require("redis");

const redisClient = redis.createClient();

redisClient.connect().then(() => {
    console.log("Redis database running!");
});

module.exports = redisClient;