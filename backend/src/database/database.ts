import { Pool } from "pg";
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "proj_4",
  password: process.env.PASSWORD,
  port: 5432,
});

export default pool;
