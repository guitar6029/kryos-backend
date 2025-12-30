import "dotenv/config";
import { pool } from "./db.js";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 3000;

await pool.query("SELECT 1");
console.log("Database connected")


app.listen(PORT, () => {
  console.log(`Listening on PORT : ${PORT}`);
});
