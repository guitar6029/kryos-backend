import { z } from "zod";

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 100;

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 50;

export const RegisterSchema = z
  .strictObject({
    name: z
      .string()
      .trim()
      .min(
        NAME_MIN_LENGTH,
        `Name has to be at least ${NAME_MIN_LENGTH} characters long`
      )
      .max(
        NAME_MAX_LENGTH,
        `Name cannot be more than ${NAME_MAX_LENGTH} characters long`
      ),
    email: z.email(),
    password: z
      .string()
      .trim()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password has to be at least ${PASSWORD_MIN_LENGTH} characters long.`
      )
      .max(
        PASSWORD_MAX_LENGTH,
        `Password cannot be more than ${PASSWORD_MIN_LENGTH} characters long.`
      ),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.strictObject({
  email: z.email(),
  password: z.string().trim(),
});
