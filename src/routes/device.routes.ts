import express from "express";
import {
  listDevices,
  getDeviceById,
  createDevice,
} from "../repo/deviceRepo.js";
import { DEVICE_TYPES } from "../models/deviceType.js";
const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json(listDevices());
});

router.get("/:id", (req, res) => {
  const device = getDeviceById(req.params.id);
  if (!device) {
    return res.status(404).json({ error: { message: "Device not found." } });
  }
  return res.status(200).json(device);
});

router.post("/", (req, res) => {
  const { name, type } = req.body;
  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: { message: "Name is not valid" } });
  }

  if (!DEVICE_TYPES.includes(type)) {
    return res.status(400).json({ error: { message: "Type is not valid" } });
  }
  const device = createDevice({ name: name.trim(), type });
  return res.status(201).json(device);
});

export default router;
