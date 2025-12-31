import express from "express";
import {
  listDevices,
  getDeviceById,
  createDevice,
} from "../repo/deviceRepo.js";
import { DEVICE_TYPES } from "../models/deviceType.js";
import { RepoError } from "../repo/errors.js";
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
  const { name, type } = req.body;
  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: { message: "Name is not valid" } });
  }

  if (!DEVICE_TYPES.includes(type)) {
    return res.status(400).json({ error: { message: "Type is not valid" } });
  }

  try {
    const device = await createDevice({ name: name.trim(), type });
    return res.status(201).json(device);
  } catch (err: unknown) {
    console.error("createDevice failed:", err);

    // If you have a UNIQUE constraint and pg throws 23505:
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
