import React, { useState } from 'react';
import './checkout.css'

const Checkout = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Purchase successful!")
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Shipping Information</h2>
      <div><input id = 'input' type="text" name="address" placeholder='Address' required />

      <input id = 'input' type="text" name="city" placeholder='City' required />
      
      <input id = 'input' type="text" name="code" placeholder='Postal Code' required /></div>

      <h2>Payment Information</h2>
      <div><input id = 'input' type="text" name="name" placeholder='Name On Card' required />

      <input id = 'input' type="number" name="card_num" placeholder='Card Number' required />

      <div id = 'date-cvv'>
        <input type="date" name="exp_date" required />

      <input type='number' name="cvv" placeholder='CVV' required /></div>

      <button type="submit">Place Order</button></div>
    </form>
  );
};

export default Checkout;
