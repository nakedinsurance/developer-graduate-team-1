// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // For Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyCd0Ix_tPg42N3UzzvZ_zTkHxAQ9KRkdoo",
    authDomain: "developer-graduate-team-1.firebaseapp.com",
    databaseURL: "https://developer-graduate-team-1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "developer-graduate-team-1",
    storageBucket: "developer-graduate-team-1.appspot.com",
    messagingSenderId: "147900190677",
    appId: "1:147900190677:web:71049698dc1f55a8cc375c",
    measurementId: "G-X78VV0H6YG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
