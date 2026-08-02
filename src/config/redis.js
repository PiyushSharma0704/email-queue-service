const Redis = require("ioredis");
const env = require("./env");

const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,

  // Required by BullMQ workers
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
  console.log("❌ Redis Error:", err.message);
});

module.exports = redis;