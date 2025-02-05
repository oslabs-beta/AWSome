import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

// eslint-disable-next-line no-undef
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new pg.Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DATABASE_URL,
});

export default pool;
