import { useState } from 'react';
import { useListMoviesQuery } from '../features/movies/moviesApi';

export default function MoviesPage() {
  const [q, setQ] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState();
  const [minRating, setMinRating] = useState();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useListMoviesQuery({
    page,
    limit: 12,
    q,
    genre: genre || undefined,
    year,
    minRating,
    sort: 'newest',
  });

  return (
    <section>
      <h2>Browse Movies</h2>
      <div className="filters">
        <input placeholder="Search title/cast/director" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        <input placeholder="Genre" value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1); }} />
        <input placeholder="Year" type="number" value={year ?? ''} onChange={(e) => { setYear(e.target.value ? Number(e.target.value) : undefined); setPage(1); }} />
        <input placeholder="Min Rating" type="number" step="0.1" min={0} max={5} value={minRating ?? ''} onChange={(e) => { setMinRating(e.target.value ? Number(e.target.value) : undefined); setPage(1); }} />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading movies</p>}

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

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>{page} / {data ? Math.ceil(data.meta.total / data.meta.limit) : 1}</span>
        <button disabled={data ? page >= Math.ceil(data.meta.total / data.meta.limit) : true} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </section>
  );
}
