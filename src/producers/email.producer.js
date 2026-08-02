const emailQueue = require("../queues/email.queue");

const addEmailJob = async (emailData) => {
  return await emailQueue.add("send-email", emailData, {
    delay: 30000,

    attempts: 3,

    backoff: {
      type: "fixed",
      delay: 3000,
    },

    removeOnComplete: 100,

    removeOnFail: 50,
  });
};

module.exports = {
  addEmailJob,
};
