// Automated Supabase Database Keep-Alive & Health Diagnostic Tool
// Run this script locally to manually ping your database and verify connection status!

const { createClient } = require('@supabase/supabase-js');
try {
  require('dotenv').config();
} catch (e) {
  // dotenv is optional since we have default fallback values
}

const url = process.env.VITE_SUPABASE_URL || "https://ssbrllliprffeegamygw.supabase.co";
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYnJsbGxpcHJmZmVlZ2FteWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTYzMDcsImV4cCI6MjA2NzM3MjMwN30.wvo84CIabcxhhc4x1DRm3uZkwCAausESXvQLadZ1VNs";

if (!url || !key) {
  console.error("❌ Error: Missing Supabase connection credentials in environment variables.");
  process.exit(1);
}

console.log("=================================================================");
console.log("Supabase DBA Keep-Alive & Health Check Protocol");
console.log("=================================================================");
console.log(`Connecting to Target: ${url}`);
console.log("Initiating health check query...");

const supabase = createClient(url, key);

(async () => {
  const start = Date.now();
  try {
    // Ping the visitors table (safely checks read access and resolves connection)
    const { data, error } = await supabase
      .from('visitors')
      .select('id')
      .limit(1);

    const duration = Date.now() - start;

    if (error) {
      console.error(`❌ Health Check Failed! Status: connection established, but query returned database error.`);
      console.error(`Error Details: ${error.message}`);
      process.exit(1);
    }

    console.log("=================================================================");
    console.log("✅ DATABASE CONNECTION STATUS: ONLINE & HEALTHY");
    console.log(`⚡ Connection Latency: ${duration}ms`);
    console.log("🔄 Keep-Alive Telemetry: Ping registered successfully!");
    console.log("=================================================================");
    process.exit(0);

  } catch (err) {
    console.error("❌ Connection Timeout: Could not resolve or reach the Supabase server.");
    console.error(`Error Details: ${err.message}`);
    console.error("\n💡 Troubleshooting Tips:");
    console.error("1. Make sure your internet connection is active.");
    console.error("2. Verify that your Supabase project is active (not paused in the dashboard).");
    process.exit(1);
  }
})();
