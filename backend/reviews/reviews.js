// routes/reviews.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

// Create a new PostgreSQL client pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// GET ALL REVIEWS
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//GET REVIEWS BY PRODUCT ID
router.get('/:product_id', async (req, res) => {
  const { product } = req.params;
  try {
    const result = await pool.query('SELECT * FROM reviews WHERE product_id = $1', [product_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; // Export the router
