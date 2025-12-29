import type { DeviceType } from "./deviceType.js";
import type {DeviceStatus} from './deviceStatus.js'
export type Device = {
    id: string;
    name: string;
    type: DeviceType;
    status: DeviceStatus;
    createdAt: string;
    lastSeenAt: string | null;
}