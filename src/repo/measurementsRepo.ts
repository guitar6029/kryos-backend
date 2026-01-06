import { pool } from "../db.js";
import type { Measurement } from "../models/measurement.js";

export const listMeasurements = async (): Promise<Measurement[]> => {
  const result = await pool.query<Measurement>(
    `SELECT id, device_id AS "deviceId", recorded_at AS "recordedAt", metric, value, unit FROM measurements ORDER BY recorded_at DESC`
  );
  return result.rows;
};
