import PropTypes from "prop-types";
import "./Movie.css";

/**
 * Componente Movie
 * Muestra una tarjeta con la imagen del poster y el botón "Agregar al carrito".
 *
 * Props:
 * - id: id de la película
 * - nombre: título de la película
 * - imagen: poster_path de la película
 * - onClick: callback al hacer click en la imagen
 * - onAddToCart: callback para agregar al carrito
 */
function Movie({ id, nombre, imagen, onClick, onAddToCart }) {
  // Imagen por defecto si no hay poster
  const posterSrc = imagen
    ? `https://image.tmdb.org/t/p/w500${imagen}`
    : "/img/placeholder.png"; // Asegúrate de tener este archivo en /public/img/

  return (
    <div className="movie-card" tabIndex={0}>
      <img
        src={posterSrc}
        alt={nombre ? `Poster de ${nombre}` : "Poster de película"}
        className="movie-poster"
        onClick={onClick}
        style={{ cursor: "pointer" }}
        draggable={false}
      />
      <button className="add-cart-btn" onClick={onAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number,
  nombre: PropTypes.string,
  imagen: PropTypes.string,
  onClick: PropTypes.func,
  onAddToCart: PropTypes.func,
};

export default Movie;
