// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import CustomerSupport from './components/CustomerSupport.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<CustomerSupport />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
