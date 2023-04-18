const express = require("express");
const Router = new express.Router();
const { supabase } = require("../utils/supabase");

Router.post("/is_admin", async (req, res) => {
  const { wallet } = req.body;
  const { data } = await supabase.from("super_admins").select("*");
  const superadmins = data.map((item) => item.wallet_address);
  res.send({ is_super_admin: superadmins.includes(wallet) });
});

module.exports = Router;
