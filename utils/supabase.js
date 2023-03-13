const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uqpgzjvgboztmoranlng.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keGpoaGd3cHlkeWlheXFia2RyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Nzk1MTg2MSwiZXhwIjoxOTkzNTI3ODYxfQ.NWlys9JAUpbYvMfIy-PHYJYgNHZJdMzpdmkDRJv7WFc"
);

module.exports = { supabase };
