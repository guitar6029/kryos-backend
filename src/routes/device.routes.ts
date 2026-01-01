import express from "express";
import { DeviceSchema } from "../validators/device.schema.js";
import {
  listDevices,
  getDeviceById,
  createDevice,
} from "../repo/deviceRepo.js";
import { DEVICE_TYPES } from "../models/deviceType.js";
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const devices = await listDevices();
    return res.status(200).json(devices);
  } catch (err) {
    console.error(`Failed to fetch devices ${err}`);
    return res
      .status(500)
      .json({ error: { message: "Failed to fetch devices" } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const device = await getDeviceById(req.params.id);
    if (!device) {
      return res.status(404).json({ error: { message: "Device not found." } });
    }
    return res.status(200).json(device);
  } catch (err) {
    console.error(`Failed to fetch devices ${err}`);
    return res
      .status(500)
      .json({ error: { message: "Failed to fetch device" } });
  }
});

router.post("/", async (req, res) => {
  const parsed = DeviceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: {
        message: "Validation Failed",
        issues: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    });
  }

  const { name, type } = parsed.data;

  try {
    const device = await createDevice({ name, type });
    return res.status(201).json(device);
  } catch (err: unknown) {
    console.error("createDevice failed:", err);
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err["code"] === "23505"
    ) {
      return res
        .status(409)
        .json({ error: { message: "Device already exists" } });
    }

    return res.status(500).json({ error: { message: "Database error" } });
  }
});

export default router;
