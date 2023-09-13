const express = require('express');
const Router = new express.Router();
const { supabase } = require('../utils/supabase');
const requestIp = require('request-ip');
const fs = require('fs');
const { parse } = require('csv-parse');

async function loadCSV(filename, ignore) {
  try {
    const data = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filename)
        .pipe(
          parse({
            delimiter: ',',
            columns: true,
            ltrim: true,
          })
        )
        .on('data', function (row) {
          data.push(row);
        })
        .on('error', function (error) {
          console.error('Error:', error.message);
          reject(error);
        })
        .on('end', function () {
          resolve(data);
        });
    });
  } catch (e) {
    if (!ignore) {
      console.error('Failed to load CSV:', filename, e);
    }
  }
  return null;
}

Router.post('/insert', async (req, res) => {
  const { body, table } = req.body;
  const { error, data } = await supabase.from(table).insert(body);
  res.send({ error, data });
});

Router.post('/select', async (req, res) => {
  const { match = undefined, table } = req.body;
  const blacklistArray = await loadCSV('./blacklist.csv');
  if (match) {
    let { error, data } = await supabase.from(table).select('*').match(match);
    if (table === 'scoreboard') {
      data = data?.filter((item) => {
        return !blacklistArray?.find((i) => i.owner_id === item.account);
      });
    }
    res.send({ error, data });
  } else {
    // the result can be > 1000, so need pagination
    let errorMessage = '';
    let pageIndex = 0;
    let pageSize = 1000; // Number of records to fetch per page
    let totalResults = [];
    let runCode = true;
    while (runCode) {
      const { error, data } = await supabase
        .from(table)
        .select('*')
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1);

      if (error) {
        errorMessage = error;
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
    if (table === 'scoreboard') {
      totalResults = totalResults?.filter((item) => {
        return !blacklistArray?.find((i) => i.owner_id === item.account);
      });
    }
    res.send({ error: errorMessage, data: totalResults });
  }
});

Router.post('/update', async (req, res) => {
  const { match, body, table } = req.body;
  const { error, data } = await supabase.from(table).update(body).match(match);
  res.send({ error, data });
});

Router.post('/delete', async (req, res) => {
  const { match, table } = req.body;
  const { error, data } = await supabase.from(table).delete().match(match);
  res.send({ error, data });
});

Router.post('/store-ip', async (req, res) => {
  const { match, body, table } = req.body;
  var clientIp = requestIp.getClientIp(req);
  let updatedBody = { ...body, client_ip: clientIp };
  const { error, data } = await supabase
    .from(table)
    .update(updatedBody)
    .match(match);
  res.send({ error, data });
});

module.exports = Router;
