import { pool } from "../db.js";
import type { SafeUser, User } from "../models/user.js";
import bcrypt from "bcryptjs";

// check if email already exists in the db
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const result = await pool.query<User>(
    `SELECT 1 FROM users WHERE email = $1 LIMIT 1;`,
    [email]
  );

  return (result.rowCount ?? 0) > 0;
};

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<SafeUser> => {
  const hash = await bcrypt.hash(password, 10);
  //hashed goes to the DB
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING
            id,
            name,
            email,
            created_at,
            updated_at
        `,
    [name, email, hash]
  );
  if (!result.rows[0]) {
    throw new Error("Failed to create user");
  }

  return result.rows[0];
};
