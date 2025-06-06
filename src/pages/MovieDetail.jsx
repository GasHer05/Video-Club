import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams(); // obtengo el id desde la URL
  const navigate = useNavigate(); // hook para redirigir al home
  const [pelicula, setPelicula] = useState(null); // estado para la data de la película
  const [error, setError] = useState(false); // estado para manejar errores

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

  // Paso 1: mostrar spinner mientras carga
  if (!pelicula && !error) {
    return <Loader />;
  }

  // Paso 2: Si hubo error
  if (error) {
    return (
      <p className="error-message">No se encontró la película solicitada.</p>
    );
  }

  // Paso 3: volver al home
  const volverHome = () => {
    navigate("/");
  };

  return (
    <main className="movie-detail-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
        alt={pelicula.title}
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

        {/* Botón para regresar al inicio */}
        <button className="back-button" onClick={volverHome}>
          Volver al inicio
        </button>
      </div>
    </main>
  );
}

export default MovieDetail;
