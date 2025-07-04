import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/cartSlice";
import axios from "axios";
import Loader from "../components/Loader";
import { RiShoppingCart2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  // Carga datos de película y trailer de YouTube
  useEffect(() => {
    setError(false);
    setPelicula(null);
    setTrailerKey(null);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES`
      )
      .then((res) => {
        setPelicula(res.data);
        // Luego busca el trailer
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES`
          )
          .then((videoRes) => {
            const trailer = videoRes.data.results.find(
              (vid) =>
                vid.site === "YouTube" &&
                (vid.type === "Trailer" || vid.type === "Teaser")
            );
            if (trailer) {
              setTrailerKey(trailer.key);
            }
          });
      })
      .catch(() => {
        setError(true);
      });
  }, [id]);

  if (!pelicula && !error) {
    return <Loader />;
  }

  if (error) {
    return (
      <main className="movie-detail-container">
        <p className="error-message">No se encontró la película solicitada.</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </main>
    );
  }

  const {
    title,
    original_title,
    poster_path,
    overview,
    release_date,
    genres,
    original_language,
    vote_average,
    vote_count,
    runtime,
    backdrop_path,
  } = pelicula;

  const genreList = genres?.map((g) => g.name).join(", ") || "N/A";
  const duracion = runtime ? `${runtime} minutos` : "N/A";
  const year = release_date ? release_date.slice(0, 4) : "N/A";
  const idioma =
    original_language === "es"
      ? "español"
      : original_language === "en"
      ? "inglés"
      : original_language?.toUpperCase();

  // Fondo dinámico con backdrop de la película
  const backgroundStyle = backdrop_path
    ? {
        backgroundImage: `linear-gradient(rgba(30,30,30,0.90), rgba(30,30,30,0.98)), url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        transition: "background-image 0.5s",
      }
    : {};

  return (
    <>
      <section className="imagSection"></section>
      <main className="movie-detail-container" style={backgroundStyle}>
        <button className="back-button" onClick={() => navigate("/")}>
          ← Volver al inicio
        </button>
        <div className="movie-detail-main">
          <div className="movie-detail-img-wrapper">
            {trailerKey ? (
              <div className="movie-detail-video-wrapper">
                <iframe
                  title="Trailer"
                  width="340"
                  height="200"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="movie-detail-video"
                  style={{ borderRadius: "12px", background: "#222" }}
                ></iframe>
              </div>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                className="movie-detail-img"
              />
            )}
          </div>
          <section className="movie-detail-info">
            <h1 className="movie-title">{title}</h1>
            <div className="movie-meta">
              <span>{year}</span>
              <span>·</span>
              <span>{duracion}</span>
              <span>·</span>
              <span>
                ⭐ {vote_average} ({vote_count} votos)
              </span>
            </div>
            <div className="movie-genres">
              <strong>Géneros:</strong> {genreList}
            </div>
            <div className="movie-overview">
              <p>{overview || "Sin descripción."}</p>
            </div>
            <div className="movie-ficha">
              <ul>
                <li>
                  <strong>Título original:</strong> {original_title}
                </li>
                <li>
                  <strong>Estreno:</strong> {release_date || "N/A"}
                </li>
                <li>
                  <strong>Idioma original:</strong> {idioma}
                </li>
                <li>
                  <strong>Promedio votos:</strong> {vote_average}
                </li>
                <li>
                  <strong>Votos totales:</strong> {vote_count}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                  }}
                >
                  <span>
                    <strong>$ </strong>
                    {(vote_average * 3).toFixed(2)}
                  </span>
                  <button
                    className="cart-icon-btn"
                    title="Agregar al carrito"
                    onClick={(event) => {
                      event.stopPropagation();
                      const precio = Number((vote_average * 3).toFixed(2));
                      dispatch(
                        addMovie({
                          id: id,
                          name: title,
                          price: precio,
                          imagen: poster_path,
                        })
                      );
                      toast.success(
                        `Se agregó "${title}" al carrito correctamente`
                      );
                    }}
                  >
                    <RiShoppingCart2Line size={22} color="#ffc107" />
                  </button>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default MovieDetail;
