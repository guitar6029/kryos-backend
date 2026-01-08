import { pool } from "../db.js";

export default async function globalTeardown() {
  await pool.end();
}
