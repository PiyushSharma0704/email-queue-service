const emailQueue = require("../queues/email.queue");

const scheduleEmailJob = async () => {
  await emailQueue.add(
    "send-email",
    {
      to: "cron@example.com",
      subject: "Cron Email",
      text: "This email is scheduled every minute.",
    },
    {
      repeat: {
        every: 10000, // every 10 seconds
      },

      removeOnComplete: 100,
      removeOnFail: 50,
    },
  );

  console.log("📅 Cron job registered");
};

module.exports = scheduleEmailJob;
