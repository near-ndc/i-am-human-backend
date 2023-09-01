const express = require("express");
const Router = new express.Router();
const { supabase } = require("../utils/supabase");
const table = "scoreboard"

Router.get("/scoreboard", async (req, res) => {
    const {communityName, communityVertical} = req.query;
    if (communityName || communityVertical) {
    const conditions = {}
    if (communityName) {
        conditions['community-name'] = communityName
    }
    if (communityVertical) {
     conditions['community-vertical'] = communityVertical
    }
    const { error, data } = await supabase.from(table).select("*").match(conditions);
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

module.exports = Router;
