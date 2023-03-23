const express = require("express");
const Router = new express.Router();
const { supabase } = require("../utils/supabase");
const {
  encryptWithPublicKey,
  decryptWithPrivateKey,
} = require("../utils/encypt");

Router.post("/encrypt-pii-number", async (req, res) => {
  const { wallet, number } = req.body;
  const encrypted_number = encryptWithPublicKey(
    "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwWpFql9xN/3U0klOegqS\nZinvg4ysUG6bll/uLWPit7qa2ThH/lLIHNJYpa3Crf3fKZ1+Rcx5Bdgqugwzq9xF\nDs28Ju3jq7AF15rti/fbcwYgQc9eQm9dUDYgDYGbM/x5hdO/C/0l8h/w92Jwadhr\nhtyB6rKRVt1W2w0x5/hYFYpWpL6sRuBClaREBP7sYzbgf7GzZRpJmbDWN3C6tbJ0\nbTeU84XyqX6BAxewZKJzikoSeqI/vqGF7W3tPKssdTpoQJgsziRruO+tZ4V4Cg2h\nEAbQ0NUIMfTG692TrDj9qdBB1k45GbjurBXvKd2cZ5RnnbRor6/bapalCNRz0WaN\nKQIDAQAB\n-----END PUBLIC KEY-----\n",
    number
  );
  await supabase
    .from("users")
    .update({ encypted_telegram_number: encrypted_number })
    .match({ wallet_identifier: wallet });
  console.log(encrypted_number);
  res.send(true);
});

Router.post("/decrypt-pii-number", async (req, res) => {
  const { wallet } = req.body;
  const { data } = await supabase
    .from("users")
    .select("*")
    .match({ wallet_identifier: wallet });
  const number = decryptWithPrivateKey(
    process.env.PRIVATE_KEY,
    data[0].encypted_telegram_number
  );
  setTimeout(()=>{
    res.send(number);
  })
});

module.exports = Router;
