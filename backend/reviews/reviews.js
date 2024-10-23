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
// POST route to create a new review
router.post('/', async (req, res) => {
    const {review_text, product_id } = req.body; // Assuming these fields are part of the review
    
    // Input validation (you can customize this as needed)
    if (!product_id || !review_text) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
  
    try {
      // Query to insert a new review into the reviews table
      const result = await pool.query(
        'INSERT INTO reviews (body, review_text) VALUES ($1, $2) RETURNING *',
        [product_id, user_id, rating, review_text]
      );
  
      res.status(201).json(result.rows[0]); // Return the newly created review
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router; // Export the router
