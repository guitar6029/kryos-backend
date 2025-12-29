import type { Device } from "../models/device.js";
import crypto from "crypto";
import type { CreateDeviceInput } from "../models/createDeviceInput.js";

const devices: Device[] = [
  {
    id: crypto.randomUUID(),
    name: "BaseCamp-1",
    type: "DRONE",
    status: "ONLINE",
    createdAt: new Date().toISOString(),
    lastSeenAt: null,
  },
];

export const listDevices = (): Device[] => {
  return devices;
};

export const getDeviceById = (id: string): Device | undefined => {
  return devices.find((device: Device) => device.id === id);
};

export const createDevice = (form: CreateDeviceInput): Device => {
  const newDevice: Device = {
    id: crypto.randomUUID(),
    name: form.name,
    type: form.type,
    status: "OFFLINE",
    createdAt: new Date().toISOString(),
    lastSeenAt: null,
  };

  devices.push(newDevice);

  return newDevice;
};
