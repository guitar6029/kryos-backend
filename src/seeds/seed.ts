import "dotenv/config";
import { pool } from "../db.js";

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // reset (dev-only behavior)
    await client.query("TRUNCATE TABLE devices");

    // insert Kryos devices
    await client.query(`
      INSERT INTO devices (name, type, status, last_seen_at)
      VALUES
        ('KRYOS-MK1-ALPHA', 'DRONE', 'ACTIVE', now()),
        ('KRYOS-MK1-BRAVO', 'DRONE', 'MAINTENANCE', now()),
        ('KRYOS-EX1-001', 'EXOFRAME', 'INACTIVE', NULL),
        ('KRYOS-EX1-002', 'EXOFRAME', 'ACTIVE', now()),
        ('KRYOS-SENTINEL-01', 'SENSOR', 'ACTIVE', now())
    `);

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
