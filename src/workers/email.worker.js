const { Worker } = require("bullmq");

const redis = require("../config/redis");

const { sendEmail } = require("../services/email.service");
const deadLetterQueue = require("../queues/dead-letter.queue");

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    console.log("====================================");
    console.log(`Job ID : ${job.id}`);

    console.log(`Attempt : ${job.attemptsMade + 1}`);

    console.log(`Total Attempts : ${job.opts.attempts}`);

    await sendEmail(job.data);

    console.log("====================================");
  },
  {
    connection: redis,
  },
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

emailWorker.on("failed", async (job, err) => {
  console.log(`Job ${job.id} failed`);

  // Only move after the final retry
  if (job.attemptsMade === job.opts.attempts) {
    await deadLetterQueue.add("dead-email", {
      jobId: job.id,
      reason: err.message,
      payload: job.data,
      failedAt: new Date().toISOString(),
    });

    console.log("Moved to Dead Letter Queue");
  }
});

console.log("Worker Started");

module.exports = emailWorker;
