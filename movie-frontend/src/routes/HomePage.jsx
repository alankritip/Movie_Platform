import { useListMoviesQuery } from '../features/movies/moviesApi';

export default function HomePage() {
  const { data, isLoading, isError } = useListMoviesQuery({ page: 1, limit: 10, sort: 'trending' });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading trending movies</p>;

  return (
    <section>
      <h2>Featured & Trending</h2>
      <div className="grid">
        {data?.data.map((m) => (
          <article key={m._id} className="card">
            <img src={m.posterUrl} alt={m.title} />
            <h3>{m.title}</h3>
            <p>{m.releaseYear} • {m.genres?.join(', ')}</p>
            <p>⭐ {m.avgRating} ({m.ratingsCount})</p>
            <a href={`/movies/${m._id}`}>Open</a>
          </article>
        ))}
      </div>
    </section>
  );
}
