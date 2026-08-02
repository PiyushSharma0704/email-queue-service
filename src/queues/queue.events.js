const { QueueEvents } = require("bullmq");

const redis = require("../config/redis");

const queueEvents = new QueueEvents("email-queue", {
  connection: redis,
});

queueEvents.on("waiting", ({ jobId }) => {
  console.log(`🟡 Job ${jobId} waiting`);
});

queueEvents.on("active", ({ jobId }) => {
  console.log(`🔵 Job ${jobId} active`);
});

queueEvents.on("completed", ({ jobId }) => {
  console.log(`🟢 Job ${jobId} completed`);
});

queueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`🔴 Job ${jobId} failed`);
  console.log(failedReason);
});

queueEvents.on("delayed", ({ jobId }) => {
  console.log(`🟠 Job ${jobId} delayed`);
});

module.exports = queueEvents;