import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import customer_support from "./component4/customer.service.js"
import products from "./component4/products.js"
import dotenv from 'dotenv';
dotenv.config();

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/customer-support', customer_support);
app.use('/api/products', products);

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
