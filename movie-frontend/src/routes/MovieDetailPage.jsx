import { useParams } from 'react-router-dom';
import { useGetMovieWithReviewsQuery } from '../features/movies/moviesApi';
import { useUpsertReviewMutation } from '../features/reviews/reviewsApi';
import { useSelector } from 'react-redux';
import { useAddWatchlistMutation, useRemoveWatchlistMutation } from '../features/users/usersApi';
import { useState } from 'react';

export default function MovieDetailPage() {
  const { id = '' } = useParams();
  const { data, isLoading, isError, refetch } = useGetMovieWithReviewsQuery({ id, page: 1, limit: 10 });
  const [upsertReview, { isLoading: saving }] = useUpsertReviewMutation();
  const [addWatch] = useAddWatchlistMutation();
  const [removeWatch] = useRemoveWatchlistMutation();
  const auth = useSelector((s) => s.auth);

  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading movie</p>;

  const { movie, reviews } = data.data;

  const submitReview = async () => {
    if (!auth.user) return alert('Login required');
    try {
      await upsertReview({ movieId: id, rating, text }).unwrap();
      setText('');
      await refetch();
    } catch {
      alert('Failed to submit review');
    }
  };

  const addToWatchlist = async () => {
    if (!auth.user) return alert('Login required');
    await addWatch({ id: auth.user.id, movieId: id, status: 'planned' }).unwrap();
    alert('Added to watchlist');
  };

  const removeFromWatchlist = async () => {
    if (!auth.user) return alert('Login required');
    await removeWatch({ id: auth.user.id, movieId: id }).unwrap();
    alert('Removed from watchlist');
  };

  return (
    <section>
      <div className="detail">
        <img src={movie.posterUrl} alt={movie.title} />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.releaseYear} • {movie.genres?.join(', ')} • ⭐ {movie.avgRating} ({movie.ratingsCount})</p>
          <p>{movie.synopsis}</p>
          {movie.trailerUrl && (
            <iframe title="Trailer" width="560" height="315" src={movie.trailerUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          )}

          <div className="actions">
            <button onClick={addToWatchlist}>Add to Watchlist</button>
            <button onClick={removeFromWatchlist}>Remove from Watchlist</button>
          </div>

          <div className="review-form">
            <h3>Write a review</h3>
            <label>
              Rating:
              <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
            </label>
            <textarea placeholder="Your thoughts..." value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={submitReview} disabled={saving}>{saving ? 'Saving...' : 'Submit'}</button>
          </div>
        </div>
      </div>

      <h3>Recent Reviews</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r._id}>
            <strong>{r.userId?.username}</strong> — ⭐ {r.rating}
            <div>{r.text}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
