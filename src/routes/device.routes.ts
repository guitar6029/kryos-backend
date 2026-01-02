import express from "express";
import { DeviceById, DeviceSchema } from "../validators/device.schema.js";
import {
  listDevices,
  getDeviceById,
  createDevice,
} from "../repo/deviceRepo.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const devices = await listDevices();
    res.status(200).json(devices);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const parsed = DeviceById.safeParse({ id: req.params.id });

    if (!parsed.success) {
      return res.status(400).json({
        error: {
          message: "Validation Failed",
          issues: parsed.error.issues,
        },
      });
    }

    const device = await getDeviceById(parsed.data.id);

    if (!device) {
      return res.status(404).json({ error: { message: "Device not found." } });
    }

    return res.status(200).json(device);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
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

    const device = await createDevice({ name, type });
    return res.status(201).json(device);
  })
);

export default router;
