const app = require("./app");
const env = require("./config/env");

const redis = require("./config/redis");

const emailWorker = require("./workers/email.worker");
const dlqWorker = require("./workers/dead-letter.worker");
const queueEvents = require("./queues/queue.events");

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});

const shutdown = async (signal) => {
  console.log(`\n${signal} received`);
  console.log("Gracefully shutting down...");

  try {
    await emailWorker.close();
    console.log("✅ Email Worker Closed");

    await dlqWorker.close();
    console.log("✅ DLQ Worker Closed");

    await queueEvents.close();
    console.log("✅ Queue Events Closed");

    await redis.quit();
    console.log("✅ Redis Connection Closed");

    server.close(() => {
      console.log("✅ HTTP Server Closed");
      process.exit(0);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));