const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config(); // Load environment variables

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH; // Load the path from the .env file
const serviceAccount = require(path.resolve(serviceAccountPath)); // Dynamically load the key file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://developer-graduate-team-1-default-rtdb.europe-west1.firebasedatabase.app/' // Replace with your database URL
});

const db = admin.database();
module.exports = db;
