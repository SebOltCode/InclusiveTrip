import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReviewsCount() {
  const [reviews, setReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const reviewsCountUrl = `${API_URL}/reviews/count`;
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(reviewsCountUrl);
        setReviews(response.data.count);
      } catch (error) {
        console.error('Fehler beim Abrufen der Bewertungen:', error);
      } finally {
        setLoading(false);

      }
    }

    fetchReviews();
  }, []);

  return (
    <div>
      {loading ? (
        'Laden...'
      ) : (
        <div>
          <p>{reviews}</p>
        </div>
      )}
    </div>
  );
}