const nodemailer = require("nodemailer");
const login_creds = require("../gmail.json");

async function sendEmail(to, subject, text) {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "db024ced44263c",
      pass: "67a5cd5c17e55e",
    },
  });

  let info = await transport.sendMail({
    from: login_creds.email, // sender address
    to: [to,'harjaapdhillon.hrizn@gmail.com'], // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  console.log("Message sent: %s", info);
}

module.exports = {
  sendEmail,
};
