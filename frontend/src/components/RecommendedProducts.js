import React, { useState, useEffect } from 'react';
import './RecommendedProducts.css'; // Make sure the path is correct

const RecommendedProducts = ({ customerId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch recommended products for the given customer ID
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recommendations/${customerId}`);
        const data = await response.json();
        console.log(data); // Log the response for debugging purposes

        if (response.ok) {
          setRecommendedProducts(data.recommendedProducts); // Use the correct key
        } else {
          setError('Failed to fetch recommendations.');
        }
      } catch (err) {
        setError('Failed to fetch recommendations.');
      }
    };

    fetchRecommendations();
  }, [customerId]);

  return (
    <div className="recommended-products-container">
      <h2>Recommended Products</h2>
      {error && <p className="error-message">{error}</p>}

      {recommendedProducts.length > 0 ? (
        <ul className="products-grid">
          {recommendedProducts.map((product) => (
            <li key={product.productId} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price: R</strong> {product.price}</p>
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
