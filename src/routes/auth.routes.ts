import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { LoginSchema, RegisterSchema } from "../validators/auth.schema.js";
import { checkEmailExists, createUser } from "../repo/authRepo.js";
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
    const exists = await checkEmailExists(email)
    // we cab create the new user
    if (!exists) {
            //create the new user
            const user = await createUser({name, email, password})
    }
    //if exists
    return res.status(409).json({
        error: {
            message: "User already exists"
        }
    })
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
