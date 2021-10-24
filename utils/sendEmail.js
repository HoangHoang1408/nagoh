import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "clashofclansphamviethoang@gmail.com",
      pass: "hoang1482002",
    },
  });
  const message = {
    from: "Nagoh noreply@nagoh.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };
  try {
    await transport.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};
export default sendEmail;
