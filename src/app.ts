import express from "express";
import HealthRouter from "./routes/health.routes.js";
import DeviceRouter from "./routes/device.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

/** MIDDLEWARE */
app.use(express.json());
app.use(requestLogger);

/** ROUTES */
app.use("/health", HealthRouter);
app.use("/devices", DeviceRouter)

/** ERROR */
app.use(errorHandler);

export default app;
