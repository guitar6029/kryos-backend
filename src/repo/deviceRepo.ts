import type { Device } from "../models/device.js";
import type { CreateDeviceInput } from "../models/createDeviceInput.js";
import { pool } from "../db.js";
import { DeviceSchema, DeviceById } from "../validators/device.schema.js";

export const listDevices = async (): Promise<Device[]> => {
  const result = await pool.query<Device>(
    `SELECT id, name, type, status, created_at AS "createdAt", last_seen_at AS "lastSeenAt" FROM devices`
  );

  return result.rows;
};

export const getDeviceById = async (
  id: string
): Promise<Device | undefined> => {
  const result = await pool.query<Device>(
    `SELECT id, name, type, status, created_at AS "createdAt", last_seen_at AS "lastSeenAt" FROM devices WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? undefined;
};

export const createDevice = async (
  form: CreateDeviceInput
): Promise<Device> => {
  const temp = DeviceSchema.safeParse(form);

  if (!temp.success) {
    throw new Error("Failed to create device, check the form");
  }

  const { name, type } = temp.data;

  //only query if the Schema is correct
  const result = await pool.query<Device>(
    `
    INSERT INTO devices (name, type)
    VALUES ($1, $2)
    RETURNING
      id,
      name,
      type,
      status,
      created_at AS "createdAt",
      last_seen_at AS "lastSeenAt"
    `,
    [name, type]
  );
  if (!result.rows[0]) {
    throw new Error("Failed to create device");
  }

  return result.rows[0];
};
