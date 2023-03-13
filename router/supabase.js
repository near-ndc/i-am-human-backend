const express = require("express");
const Router = new express.Router();
const { supabase } = require("../utils/supabase");

Router.post("/insert", async (req, res) => {
  const { body, table } = req.body;
  const { error, data } = await supabase.from(table).insert(body);
  res.send({ error, data });
});

Router.post("/select", async (req, res) => {
  const { match = undefined, table } = req.body;
  if (match) {
    const { error, data } = await supabase.from(table).select("*").match(match);
    res.send({ error, data });
  } else {
    const { error, data } = await supabase.from(table).select("*");
    res.send({ error, data });
  }
});

Router.post("/update", async (req, res) => {
  const { match, body, table } = req.body;
  const { error, data } = await supabase.from(table).update(body).match(match);
  res.send({ error, data });
});

Router.post("/delete", async (req, res) => {
  const { match, table } = req.body;
  const { error, data } = await supabase.from(table).delete().match(match);
  res.send({ error, data });
});

module.exports = Router;
