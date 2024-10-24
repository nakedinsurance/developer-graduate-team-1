import React from 'react';
import './cart.css'

const Cart = () => {
    const data = require('./db.json')
    const items = [];
    let quantities = [5, 6, 2, 1]

    for (let i = 0; i < 10; i++) {
        // items.push()
        items.push(data["product"][Math.floor(Math.random()*90)])
    }

    const total = items.reduce((sum, item) => sum + Number(item["price"].replace(/,/g, '')) * quantities[Math.floor(Math.random()*4)], 0);

    return (

        <div>
            <h2>Your Cart</h2>
            {items.map((item, index) => (
                <div key={index}>
                <p>{item["name"]} Quantity: {quantities[Math.floor(Math.random()*4)]} Price: R{item["price"]}</p>
        </div>
         ))}

         
             <div>
<br></br>
        <p>Total: R{total.toFixed(2)}</p>
        </div>
        <button a="checkout.js" > Checkout</button>
        </div>
    );
};

export default Cart
