const sendEmail = async ({ to, subject, text }) => {
  console.log("--------------------------------");
  console.log("📧 Sending Email...");

  console.log("To:", to);
  console.log("Subject:", subject);

  if (subject === "FAIL") {
    throw new Error("SMTP Server Down");
  }

  console.log("Message:", text);

  console.log("✅ Email Sent");
  console.log("--------------------------------");
};

module.exports = {
  sendEmail,
};
