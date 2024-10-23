// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account-key.json'); // Replace with the actual path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://developer-graduate-team-1-default-rtdb.europe-west1.firebasedatabase.app/' // Replace with your database URL
});

const db = admin.database();
module.exports = db;
