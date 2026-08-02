// const { Worker } = require("bullmq");

// const redis = require("../config/redis");

// const { sendEmail } = require("../services/email.service");

// const emailWorker = new Worker(
//   "email-queue",
//   async (job) => {
//     console.log(`Processing Job #${job.id}`);

//     await sendEmail(job.data);
//   },
//   {
//     connection: redis,
//   }
// );

// emailWorker.on("completed", (job) => {
//   console.log(`Job ${job.id} completed`);
// });

// emailWorker.on("failed", (job, err) => {
//   console.log(`Job ${job?.id} failed`);
//   console.log(err.message);
// });

// console.log("👷 Email Worker Started");

const { Worker } = require("bullmq");

const redis = require("../config/redis");

const { sendEmail } = require("../services/email.service");

const worker = new Worker(
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
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job.id} failed`);

  console.log(err.message);
});

console.log("Worker Started");