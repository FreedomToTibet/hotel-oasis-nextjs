import { createClient } from "@supabase/supabase-js";

// Next.js automatically loads environment variables, so we don't need dotenv.config()
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;