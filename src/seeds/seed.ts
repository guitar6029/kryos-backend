import "dotenv/config";
import { pool } from "../db.js";

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1) reset (dev seed behavior)
    await client.query("TRUNCATE TABLE devices");

    // 2) insert rows (you choose the data)
    // await client.query("INSERT INTO devices (...) VALUES ...");

    await client.query("COMMIT");
    console.log("✅ Seed complete");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seed failed:", err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

await seed();
