import React, { useState } from 'react';
import './checkout.css'

const Checkout = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Purchase successful!")
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Shipping Information</h2>
      <div><input class = 'input' type="text" name="address" placeholder='Address' required />

      <input class = 'input' type="text" name="city" placeholder='City' required />
      
      <input class = 'input' id = "code" type="number" name="code" placeholder='Zip Code' min = "1000" max = "9999" required /></div>

      <h2>Payment Information</h2>
      <div><input class = 'input' type="text" name="name" placeholder='Name On Card' required />

      <input class = 'input' type="number" name="card_num" placeholder='Card Number'  required />

      <div id = 'date-cvv'>
        <input type="date" id = "date" name="exp_date" required />

      <input type='number' name="cvv" id ="cvv" placeholder='CVV' min = "100" max = "999" required /></div>

      <button type="submit">Place Order</button></div>
    </form>
  );
};

export default Checkout;
