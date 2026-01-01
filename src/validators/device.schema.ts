import { z } from "zod";
import { DEVICE_TYPES } from "../models/deviceType.js";

const DEVICE_MIN_NAME_LENGTH = 2;
const DEVICE_MAX_NAME_LENGTH = 100;

export const DeviceSchema = z.strictObject({
  name: z
    .string()
    .min(
      DEVICE_MIN_NAME_LENGTH,
      `Name has to be at least ${DEVICE_MIN_NAME_LENGTH} characters long.`
    )
    .max(
      DEVICE_MAX_NAME_LENGTH,
      `Name cannot be more than ${DEVICE_MAX_NAME_LENGTH} characters long.`
    ),
  type: z.enum(DEVICE_TYPES),
});
