import { useDispatch } from "react-redux";
import { addMovie } from "../store/cartSlice";
import "./Movie.css";

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
        onClick={(event) => {
          event.stopPropagation();
          dispatch(addMovie({ id: id, name: nombre }));
        }}
        style={{ position: "absolute", bottom: "20px", right: "20px" }}
      >
        Add to cart
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
