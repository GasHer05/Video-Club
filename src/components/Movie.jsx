import "./Movie.css";

function Movie({ id, imagen, nombre, onClick }) {
  return (
    <div
      className="movie-card"
      data-id={id}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img src={`https://image.tmdb.org/t/p/w500${imagen}`} alt={nombre} />
    </div>
  );
}

export default Movie;
