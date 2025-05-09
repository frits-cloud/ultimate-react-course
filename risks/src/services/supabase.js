import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tfsgxfdhtmudoznlxjnd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmc2d4ZmRodG11ZG96bmx4am5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MjQ0ODMsImV4cCI6MjA2MjQwMDQ4M30.lg90vmo8YpuO4IyaywrHU9bY166BPyYXA2cGIbQZG5g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
