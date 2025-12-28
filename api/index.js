const express = require('express');
const { Pool } = require('pg');
const app = express();

// This uses the environment variable Vercel will provide automatically
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.json({ message: "Connected to Postgres!", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app; // Vercel needs the app exported