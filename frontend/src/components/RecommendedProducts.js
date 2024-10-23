// src/components/RecommendedProducts.js
import React, { useState, useEffect } from 'react';

const RecommendedProducts = ({ customerId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch recommended products for the given customer ID
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recommendations/${customerId}`);
        const data = await response.json();
        console.log(data);  // Log the response for debugging purposes

        if (response.ok) {
          setRecommendedProducts(data.recommendedProducts);  // Use the correct key
        } else {
          setError(data.error || 'Failed to fetch recommendations.');
        }
      } catch (err) {
        setError('Failed to fetch recommendations.');
      }
    };

    fetchRecommendations();
  }, [customerId]);

  return (
    <div>
      <h2>Recommended Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recommendedProducts.length > 0 ? (
        <ul>
          {recommendedProducts.map((product) => (
            <li key={product.productId}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price: R</strong> {product.price}</p>  {/* Assuming price is already a string */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default RecommendedProducts;
