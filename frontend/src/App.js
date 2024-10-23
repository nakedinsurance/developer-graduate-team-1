// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import ProductDetails from './product.jsx';
import ReviewForm from './review-form.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/review-form" element={<ReviewForm  />} />
      </Routes>
    </Router>
  );
};

export default App;
