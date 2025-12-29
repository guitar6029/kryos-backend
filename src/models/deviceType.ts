export const DEVICE_TYPES = ["DRONE", "EXO", "SENSOR", "TURRET", "RELAY"] as const;
export type DeviceType = (typeof DEVICE_TYPES)[number];