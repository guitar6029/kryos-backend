import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // default
  let status = 500;
  let message = "Internal Server Error";
  let details: unknown;

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    details = err.details;
  }

  res.status(status).json({
    error: { message, details },
  });
}
