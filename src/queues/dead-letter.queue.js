const { Queue } = require("bullmq");

const redis = require("../config/redis");

const deadLetterQueue = new Queue("dead-letter-queue", {
  connection: redis,
});

module.exports = deadLetterQueue;