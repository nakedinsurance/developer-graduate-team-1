const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const classifyReview =  async (reviewText = "I like this product") => {
  const API_KEY = process.env.OPENAI_API_KEY; // Use your OpenAI API key
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a sentiment analysis model." },
      { role: "user", content: `Classify the following review as good or bad: '${reviewText}'` }
    ]
  }, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  // Return 'good' or 'bad'
  const sentiment = response.data.choices[0].message.content.trim().toLowerCase();
  return sentiment === "positive" ? "good" : "bad"; // Assuming the model returns "positive" or "negative"
}
module.exports = classifyReview; 