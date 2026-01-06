export type Measurement = {
  id: string;
  deviceId: string;
  recordedAt: Date;
  metric: string;
  value: number;
  unit: string | null;
};
