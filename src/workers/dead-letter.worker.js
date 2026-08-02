const { Worker } = require("bullmq");

const redis = require("../config/redis");

const deadLetterWorker = new Worker(
  "dead-letter-queue",
  async (job) => {
    console.log("================================");
    console.log("💀 Dead Letter Queue");
    console.log("Original Job:", job.data.jobId);
    console.log("Reason:", job.data.reason);
    console.log("Payload:", job.data.payload);
    console.log("================================");
  },
  {
    connection: redis,
  }
);

console.log("💀 DLQ Worker Started");

module.exports = deadLetterWorker;