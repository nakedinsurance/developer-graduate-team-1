// routes/reviews.js
import express from 'express';
import pkg from 'pg'; // Import pg as a default export
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: '.env.local' });

const { Pool } = pkg; // Destructure Pool from the default import
const router = express.Router(); // Only declare the router once

dotenv.config({ path: '.env.local' });


// Create a new PostgreSQL client pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Endpoint to fetch the products
router.get('/products', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const classifyReview =  async (reviewText = "I like this product") => {
    const API_KEY = process.env.OPENAI_API_KEY; // Use your OpenAI API key
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a sentiment analysis model." },
        { role: "user", content: `Classify the following review with onbe word: good or bad: '${reviewText}'` }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Return 'good' or 'bad'
    const sentiment = response.data.choices[0].message.content.trim().toLowerCase();
    // console.log(sentiment);
    return sentiment; // Assuming the model returns "positive" or "negative"
  }

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
    const { body, product_id } = req.body; // Assuming these fields are part of the review
    // console.log(req.body);
    
    // Input validation
    if (!product_id || !body) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
  
    try {
      // Classify the review sentiment
      const sentiment = await classifyReview(body);
      console.log(sentiment);
      // Query to insert a new review into the reviews table
      const result = await pool.query(
        'INSERT INTO reviews (product_id, body,sentiment) VALUES ($1, $2, $3) RETURNING *',
        [product_id, body, sentiment] // Include sentiment in the database insert
      );
  
      res.status(201).json(result.rows[0]); // Return the newly created review
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

export default router; // Export the router
