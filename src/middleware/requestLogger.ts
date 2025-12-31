import type { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  console.log(`Received a ${req.method} request to ${req.url}`);
  next();
}
