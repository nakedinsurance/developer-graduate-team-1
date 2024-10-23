// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import RecommendedProducts from './components/RecommendedProducts.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommended-products" element={<RecommendedProducts customerId="cdad3ffd-f5d6-488e-b76f-a92a151b7c72" />
} />
      </Routes>
    </Router>
  );
};

export default App;
