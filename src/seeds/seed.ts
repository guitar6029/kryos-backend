import "dotenv/config";
import { pool } from "../db.js";

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // DEV reset: devices first; CASCADE will wipe measurements too
    await client.query("TRUNCATE TABLE devices CASCADE");

    // insert devices
    await client.query(`
      INSERT INTO devices (name, type, status, last_seen_at)
      VALUES
        ('KRYOS-MK1-ALPHA',  'DRONE',  'ONLINE',  now()),
        ('KRYOS-MK1-BRAVO',  'DRONE',  'OFFLINE', now()),
        ('KRYOS-EX1-001',    'EXO',    'OFFLINE', NULL),
        ('KRYOS-EX1-002',    'EXO',    'ONLINE',  now()),
        ('KRYOS-SENTINEL-01','SENSOR', 'ONLINE',  now())
    `);

    // fetch device ids
    const { rows: devices } = await client.query<{ id: string; name: string }>(`
      SELECT id, name FROM devices ORDER BY name ASC
    `);

    // optional: wipe measurements explicitly (not required if you truncated devices CASCADE)
    // await client.query("TRUNCATE TABLE measurements");

    // insert measurements for each device
    for (const d of devices) {
      await client.query(
        `
        INSERT INTO measurements (device_id, recorded_at, metric, value, unit)
        VALUES
          ($1, now(),                    'temperature', 22.5, 'C'),
          ($1, now() - interval '1 min', 'humidity',    48.2, '%'),
          ($1, now() - interval '2 min', 'voltage',     12.1, 'V')
        `,
        [d.id]
      );
    }

    await client.query("COMMIT");
    console.log("✅ Seed complete (devices + measurements)");
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
