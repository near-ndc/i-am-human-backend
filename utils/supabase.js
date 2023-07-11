const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_CLIENT_URL,
  process.env.SUPABASE_CLIENT_ANON
);

module.exports = { supabase };
