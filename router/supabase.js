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
    // the result can be > 1000, so need pagination
    let errorMessage = ""
    let pageIndex = 0;
    let pageSize = 1000; // Number of records to fetch per page
    let totalResults = [];
    let runCode = true;
    while (runCode) {
      const { error, data } = await supabase.from(table).select('*')
      .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1);

      if (error) {
        errorMessage = error
        runCode = false;
        break;
      }

      if (data.length === 0) {
        runCode = false;
        // No more results, break the loop
        break;
      }

      totalResults = totalResults.concat(data);
      pageIndex++;
    }
    await Promise.all(totalResults);
    res.send({ error:errorMessage, data:totalResults });
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
