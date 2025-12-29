import express from "express";
import HealthRouter from "./routes/health.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";
const app = express();

/** MIDDLEWARE */
app.use(express.json());
app.use(requestLogger);

/** ROUTES */
app.use("/health", HealthRouter);

export default app;
