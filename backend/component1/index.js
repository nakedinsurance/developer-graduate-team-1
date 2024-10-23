const express = require('express');
const OpenAI = require('openai');
const db = require('./firebase'); // Import Firebase DB instance
//const { openAiApiKey } = require('./config');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI API with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Use the API key from your config file for security
});

// Endpoint to get the index of the customer and product recommendations based on customer purchase history
app.get('/recommendations/:customerId', async (req, res) => {
    const { customerId } = req.params;

    try {
        // Fetch all customers data from Firebase
        const customersSnapshot = await db.ref('customer').once('value');
        const customers = customersSnapshot.val();

        if (!customers) {
            return res.status(404).json({ error: "No customers found" });
        }

        // Find the index of the customer with the given customerId
        const customerEntries = Object.entries(customers);
        const customerIndex = customerEntries.findIndex(([key, value]) => value.customerId === customerId);
        //console.log(customerIndex);
        if (customerIndex === -1) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Fetch products data from Firebase
        const productsSnapshot = await db.ref('product').once('value');
        const products = productsSnapshot.val();

        // Prepare a list of previous purchases (could be product names or IDs)
        const previousPurchases = customers[[0]].products.join(', ');
        //console.log(previousPurchases);
        // Create the prompt for OpenAI
        const prompt = `Given the following customer information, suggest 5 products with full details in JSON format. \
        Customer Name: ${customers[customerEntries[customerIndex][0]].name}, Age: ${customers[customerEntries[customerIndex][0]].age}, Gender: ${customers[customerEntries[customerIndex][0]].gender}. \
        Previous purchases: ${previousPurchases}. Products available: ${JSON.stringify(products)}. \
        Return a JSON array of 5 product objects, each with the following keys: "productId", "name", "description", "price", and "stock". Example: \
       [{"productId": "sample-id-1", "name": "Sample Product 1", "description": "Sample description", "price": "10.00", "stock": 5}, ...] ONly return the JSON array, nothing else`;


        // Use OpenAI to generate recommendations
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });

        // Extract the recommendation from OpenAI's response
        const recommendations = response.choices[0].message.content;
        //console.log(recommendations);
        // Attempt to parse the recommendations as JSON
        let recommendedProducts;
        try {
            recommendedProducts = JSON.parse(recommendations);
        } catch (error) {
            console.error('Error parsing recommendations:', error);
            return res.status(500).json({ error: "Failed to parse recommendations" });
        }

        // Send index and recommendations back to the client
        res.json({ customerIndex, recommendedProducts });

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
