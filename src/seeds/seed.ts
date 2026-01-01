import "dotenv/config";
import { pool } from "../db.js";

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // reset (dev-only behavior)
    // CASCADE helps later when other tables reference devices
    await client.query("TRUNCATE TABLE devices RESTART IDENTITY CASCADE");

    // insert Kryos devices (aligned with Postgres enums)
    await client.query(`
      INSERT INTO devices (name, type, status, last_seen_at)
      VALUES
        ('KRYOS-MK1-ALPHA', 'DRONE',  'ONLINE',  now()),
        ('KRYOS-MK1-BRAVO', 'DRONE',  'OFFLINE', now()),
        ('KRYOS-EX1-001',   'EXO',    'OFFLINE', NULL),
        ('KRYOS-EX1-002',   'EXO',    'ONLINE',  now()),
        ('KRYOS-SENTINEL-01','SENSOR','ONLINE',  now())
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
