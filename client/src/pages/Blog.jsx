import { useState, useEffect } from "react";

export default function Blog() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="page">
      <h2 className="section-title">Movies</h2>

      <div className="search-bar">
        <label>Title</label>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </div>

      <div className="grid">
        {paginated.map((movie, i) => (
          <div key={i} className="movie-card">
            <div className="movie-card-image">
              {movie.image && <img src={movie.image} alt={movie.title} />}
            </div>
            <div className="movie-card-body">
              <span className="date">{movie.date}</span>
              <p className="title">{movie.title}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Prev
          </button>
          <span>{page + 1} / {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}