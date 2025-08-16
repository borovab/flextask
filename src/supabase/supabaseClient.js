// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kszwmtkbhgcnngyabwzk.supabase.co"; // Zëvendëso me URL-në tënde
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzendtdGtiaGdjbm5neWFid3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNTI4MjksImV4cCI6MjA3MDkyODgyOX0.8g8YsNNeFhjZd-JBOuLXBT5DrB7QQMV6gaIPUMI8vlo"; // Zëvendëso me kyçin tënd publik

export const supabase = createClient(supabaseUrl, supabaseKey);
