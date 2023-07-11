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
    } else res.send({ error: 'Please add community name or vertical.', data:[] });
});

module.exports = Router;
