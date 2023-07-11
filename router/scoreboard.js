const express = require("express");
const Router = new express.Router();
const { supabase } = require("../utils/supabase");
const table = "scoreboard"

Router.get("/scoreboard/community/:communityName/:communityVertical", async (req, res) => {
    const communityName = req.params.communityName;
    const communityVertical = req.params.communityVertical;
    if (communityName && communityVertical) {
    const conditions = {
        'community-name' : communityName,
        'community-vertical' : communityVertical
    }
    const { error, data } = await supabase.from(table).select("*").match(conditions);
    res.send({ error, data });
    }
});

Router.get("/scoreboard/communityName/:name", async (req, res) => {
    const communityName = req.params.name;
    const conditions = {'community-name' : communityName}
    const { error, data } = await supabase.from(table).select("*").match(conditions);
    res.send({ error, data });    
});

Router.get("/scoreboard/communityVertical/:vertical", async (req, res) => {
    const communityVertical = req.params.vertical;
    const conditions = {'community-vertical' : communityVertical}
    const { error, data } = await supabase.from(table).select("*").match(conditions);
    res.send({ error, data });
});

module.exports = Router;
