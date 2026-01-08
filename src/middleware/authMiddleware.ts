import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret);
    //check if decocded is an object and not null
    if (
      decoded === null ||
      typeof decoded !== "object" ||
      !("userId" in decoded)
    ) {
      return res
        .status(401)
        .json({ error: { message: "Invalid credentials" } });
    }

    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }
}
