import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null); // State for the product
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details for the specific product ID
        const productResponse = await axios.get(`http://localhost:8000/api/reviews/products/`);
        setProduct(productResponse.data); // Set product data
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []); // Dependency on productId

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch reviews for the product
        const reviewsResponse = await axios.get(`http://localhost:8000/api/reviews/all`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); // Dependency on productId

  const handleBuyNow = () => {
    // Handle buy now action (e.g., redirect to checkout or add to cart)
    alert(`Buying product: ${product.name}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.image || 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5YNRPU4910yPsW1yobc1J7of1kMM-pww1Qf5lkpKePvG1-3GeRFJPh0U9w0FLoeojueyp4HtPxcqWkGJOudVgEv3tpEnJQM9-Ia-eemENMJTFpTFm6WeZiiB2nBRDIwl9PeRGvsjEJTI/s1600/placeholder-image.jpg'} alt={product.name} style={{ width: '300px', height: '300px' }} />
      <p>{product.description}</p>
      <button onClick={handleBuyNow} style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Buy Now
      </button>
      
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p><strong>{review.body}</strong></p>
              <p>{review.review_text}</p>
              <p><em>{review.sentiment}</em></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductDetails;
