const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uqpgzjvgboztmoranlng.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcGd6anZnYm96dG1vcmFubG5nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NTQ1MjAzNywiZXhwIjoxOTkxMDI4MDM3fQ.PlaFYy5Ha7Yvq-N9s2PNTPNR0F9D6qjdE6CjJ-h8Q1k"
);

module.exports = { supabase };
