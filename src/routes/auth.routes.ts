import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { LoginSchema, RegisterSchema } from "../validators/auth.schema.js";
import {
  checkEmailExists,
  createUser,
  getUserByEmail,
} from "../repo/authRepo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    // parse RegisterSchema (  name, email, password)
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: {
          message: "Registration Failed",
          issues: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
      });
    }
    //if good
    const { name, email, password } = parsed.data;
    const exists = await checkEmailExists(email);
    // we cab create the new user
    if (exists) {
      //if exists
      return res.status(409).json({
        error: {
          message: "User already exists",
        },
      });
    }
    const user = await createUser({ name, email, password });
    return res.status(201).json(user);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // parse RegisterSchema ( name, password)
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: {
          message: "Login Failed",
          issues: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
      });
    }
    //if parsed correctly
    //get JWT secret
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const { email, password } = parsed.data;
    //see if the user with the given email exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: {
          message: "Invalid credentials",
        },
      });
    }
    // if user exists
    const passwordResult = await bcrypt.compare(password, user.password_hash);
    if (!passwordResult) {
      return res.status(401).json({
        error: {
          message: "Invalid credentials",
        },
      });
    }
    // if password matched withthe user's hash
    const payload = {
      userId: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  })
);

export default router;
