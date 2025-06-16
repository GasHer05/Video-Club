import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import "./MovieDetail.css";

/**
 * Muestra los detalles de una película.
 */
function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES`
      )
      .then((res) => {
        setPelicula(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener los detalles:", err);
        setError(true);
      });
  }, [id]);

  if (!pelicula && !error) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="error-message">No se encontró la película solicitada.</p>
    );
  }

  const volverHome = () => {
    navigate("/");
  };

  // Imagen por defecto si no hay poster_path
  const posterSrc = pelicula.poster_path
    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
    : "/img/placeholder.png";

  return (
    <main className="movie-detail-container">
      <img
        src={posterSrc}
        alt={
          pelicula.title ? `Poster de ${pelicula.title}` : "Poster de película"
        }
        className="movie-detail-img"
      />

      <div className="movie-detail-info">
        <h1>{pelicula.title}</h1>
        <p>
          <strong>Año:</strong> {pelicula.release_date.slice(0, 4)}
        </p>
        <p>
          <strong>Calificación:</strong> {pelicula.vote_average}
        </p>
        <p>
          <strong>Descripción:</strong> {pelicula.overview}
        </p>
        <p>
          <strong>Géneros:</strong>{" "}
          {pelicula.genres.map((g) => g.name).join(", ")}
        </p>
        <button
          className="agregar-carrito-btn"
          onClick={() => {
            dispatch(
              addToCart({ movie_id: pelicula.id, title: pelicula.title })
            );
            toast.success("¡Película agregada al carrito!");
          }}
        >
          Agregar al carrito
        </button>
        <button className="back-button" onClick={volverHome}>
          Volver al inicio
        </button>
      </div>
    </main>
  );
}

export default MovieDetail;
