import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { LoginSchema, RegisterSchema } from "../validators/auth.schema.js";
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
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // parse RegisterSchema ( name, password)
    const parsed = LoginSchema.safeParse(req.body);
  })
);

export default router;
