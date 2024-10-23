import React from 'react';
import './cart.css'
import '/'

const Cart = () => {
    var items = [['cat', 1, 20], ['lo', 2, 60]]

    const total = items.reduce((sum, item) => sum + item[2] * item[1], 0);
    return (

        <div>
            <h2>Your Cart</h2>
            {items.map((item, index) => (
                <div key={index}>
                <p>{item[0]} Quantity: {item[1]} Price: R{item[2]}</p>
        </div>
         ))}
             <div>
<br></br>
        <p>Total: R{total.toFixed(2)}</p>
        </div>
        </div>
    );
};

export default Cart
