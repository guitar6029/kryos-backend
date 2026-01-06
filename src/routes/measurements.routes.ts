import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { listMeasurements } from "../repo/measurementsRepo.js";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const measurements = await listMeasurements();
    res.status(200).json(measurements);
  })
);

export default router;
