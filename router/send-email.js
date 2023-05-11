const express = require("express");
const { sendEmail } = require("../utils/send-email");
const Router = new express.Router();

Router.post("/send-email", async (req, res) => {
  // await sendEmail(
  //   "i-am-human.app@pm.me",
  //   "New Application",
  //   "Please check there has been a new email."
  // );
  // res.status(200).send({ success: "email sent" });
});

module.exports = Router;
