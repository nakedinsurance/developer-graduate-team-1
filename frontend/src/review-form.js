import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId='f966934e-883e-4c6f-ab34-aeeeb764ccc7' }) => {
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!body) {
      setError('Review body is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/reviews/all', {
        body,
        product_id: productId, // Sending the product ID
      });

      // Clear the form and show a success message
      setBody('');
      setSuccessMessage('Review submitted successfully!');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to submit review. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reviewBody">Review:</label>
          <textarea
            id="reviewBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="4"
            style={{ width: '100%' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
