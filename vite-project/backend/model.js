const { Pool } = require('pg');
require('dotenv').config();

// Create a pool instance using `.env` values
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

// Reusable query function
const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err.message);
    throw err;
  }
};

module.exports = {
  query,
};
