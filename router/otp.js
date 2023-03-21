const express = require("express");
const Router = new express.Router();
const client = require("twilio")(
  "AC9b65bde6e517e7a18b6c01e11a7c5493",
  "4f4603d3d1e44e16333f974f12ab7394"
);

Router.post("/send_otp", async (req, res) => {
  const { phone } = req.body;
  client.verify.v2
    .services("VA3962dac32f8eac1dd4766972bda7af84")
    .verifications.create({ to: phone, channel: "sms" })
    .then((verification) => {
      res.status(200).send(true);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });
});

Router.post("/verify_otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const check = await client.verify.v2
      .services("VA3962dac32f8eac1dd4766972bda7af84")
      .verificationChecks.create({
        to: phone,
        code: otp,
      });
    if (check.status === "approved") {
      res.send(true);
    } else {
      throw new Error("Incorrect Token");
    }
  } catch (e) {
    res.send({ error: e?.message ?? "Unkown error occured" });
  }
});

Router.post("/send_email_otp", async (req, res) => {
  const { email } = req.body;
  client.verify.v2
    .services("VA3962dac32f8eac1dd4766972bda7af84")
    .verifications.create({ to: email, channel: "email" })
    .then((verification) => {
      res.status(200).send(true);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });
});

Router.post("/verify_email_otp", async (req, res) => {
  const { email } = req.body;
  client.verify.v2
    .services("VA3962dac32f8eac1dd4766972bda7af84")
    .verifications.create({ to: email, channel: "email" })
    .then((verification) => {
      res.status(200).send(true);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });
});

module.exports = Router