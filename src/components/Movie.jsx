import { useDispatch } from "react-redux";
import { addMovie } from "../store/cartSlice";
import "./Movie.css";

/**
 * Componente que muestra una tarjeta de película.
 * Props:
 * - id: ID de la película.
 * - imagen: path de la imagen del poster.
 * - nombre: título.
 * - onClick: función para navegar o manejar click.
 */
function Movie({ id, imagen, nombre, onClick }) {
  const dispatch = useDispatch();

  return (
    <div
      className="movie-card"
      data-id={id}
      onClick={onClick}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <img src={`https://image.tmdb.org/t/p/w500${imagen}`} alt={nombre} />
      <button
        className="add-cart-btn"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(addMovie({ id: id, name: nombre }));
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default Movie;
