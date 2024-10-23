// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';

import RecommendedProducts from './components/RecommendedProducts.js';

import CustomerSupport from './components/CustomerSupport.jsx';


const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommended-products" element={<RecommendedProducts customerId="cdad3ffd-f5d6-488e-b76f-a92a151b7c72" />
} />

      <Route path="/customer-support" element={<CustomerSupport />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
};

export default App;
