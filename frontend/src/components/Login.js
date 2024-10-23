// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import the auth object from firebase.js
import './LoginRegister.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Authenticate the user
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      navigate('/recommended-products'); // Use navigate function to redirect
    } catch (err) {
      // Updated error handling
      if (err.code === 'auth/wrong-password') {
        alert("Incorrect password. Please try again.");
      } else if (err.code === 'auth/user-not-found') {
        alert("No account found with this email. Please sign up first.");
      } else if (err.code === 'auth/invalid-email') {
        alert("Invalid email format. Please check your email.");
      } else {
        alert("Error: " + err.message);
      }
      console.error('Login error:', err);
      setError('Invalid login credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
