import express from 'express';
import OpenAI from 'openai';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();

// PostgreSQL client setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customer_support',
  password: 'password',
  port: 5432,
});

// OpenAI API setup
const openai = new OpenAI({
  apiKey: process.env.OpenAI,
});

// Define the route for handling customer support chat
router.post('/', async (req, res) => {
  const { userMessage, sessionId } = req.body;

  try {
    // OpenAI prompt context for insurance and electronics
    const promptContext = `
      You are a helpful customer support agent for Clothed Electronics and Naked Insurance. 
      Answer customer queries about electronic devices and insurance plans provided by Naked.
      Make it short and easy to understand.
    `;

    // Send user message to OpenAI with context
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `${promptContext}}` }, // Add context for the conversation
        { role: 'user', content: `Customer: ${userMessage}` } // Customer's message
      ],
    });

    const botResponse = response.choices[0].message.content.trim();

    // Send bot response back to client
    res.json({ botResponse });
  } catch (error) {
    console.error('Error handling customer support:', error);
    res.status(500).send('Something went wrong with the chatbot.');
  }
});


export default router;
