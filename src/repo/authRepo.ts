import { pool } from "../db.js";
import type { User } from "../models/user.js";

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
}) => {
    
};
