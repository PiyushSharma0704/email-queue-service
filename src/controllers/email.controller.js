const { addEmailJob } = require("../producers/email.producer");

const sendEmail = async (req, res, next) => {
  try {
    const job = await addEmailJob(req.body);

    res.status(202).json({
      success: true,
      message: "Email added to queue",
      jobId: job.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendEmail,
};
