import express from "express";
import { listDevices } from "../repo/deviceRepo.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(listDevices());
});

export default router;
