import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Movie from "../components/Movie";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "./Home.css";

function Home() {
  // Estado para el input de búsqueda
  const [searchInputValue, setSearchInputValue] = useState("");
  // Estado para la lista de películas mostradas
  const [peliculas, setPeliculas] = useState([]);
  // Estado para mostrar si hubo error en la búsqueda o carga
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook para despachar acciones a Redux

  // Maneja el cambio en el input de búsqueda
  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  // Si el input está vacío, carga películas populares de TMDb
  useEffect(() => {
    if (searchInputValue.trim() === "") {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES`
        )
        .then((res) => {
          setPeliculas(res.data.results); // Setea la lista de pelis populares
          setError(false); // Limpia error si todo ok
        })
        .catch((err) => {
          console.error("Error al cargar películas populares:", err);
          setError(true); // Muestra error si la API falla
        });
    }
  }, [searchInputValue]);

  // Si el usuario escribe algo, busca por título usando TMDb
  useEffect(() => {
    if (searchInputValue.trim() === "") return;

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES&query=${searchInputValue}`
      )
      .then((res) => {
        if (res.data.results.length === 0) {
          setError(true); // Muestra error si no hay resultados
          setPeliculas([]);
        } else {
          setPeliculas(res.data.results); // Setea pelis encontradas
          setError(false); // Limpia error si todo ok
        }
      })
      .catch((err) => {
        console.error("Error al buscar películas:", err);
        setError(true); // Muestra error si la API falla
      });
  }, [searchInputValue]);

  return (
    <>
      {/* Sección hero: puedes sumar un banner, texto, imagen, etc. */}
      <section className="imagSection">
        <div className="hero-text">
          {/* <h1>¡Tus películas favoritas!</h1>
          <h2>Buscá entre miles de títulos...</h2> */}
        </div>
      </section>

      <main>
        <div
          className="rating"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Buscar por título:</h3>
          {/* Input controlado para buscar película */}
          <input
            type="text"
            placeholder="Escribí el nombre de la película..."
            value={searchInputValue}
            onInput={handleInputChange}
            className="search-input"
          />
        </div>

        {/* Muestra mensaje si no hay resultados */}
        {error && (
          <p className="error-message">
            Lo sentimos, no se encontraron películas con el título buscado.
          </p>
        )}

        {/* Grid de películas, muestra cada Movie con botón para agregar al carrito */}
        {peliculas.length > 0 && (
          <section className="movies-grid">
            {peliculas.map((pelicula) => (
              <Movie
                key={pelicula.id}
                id={pelicula.id}
                nombre={pelicula.title}
                imagen={pelicula.poster_path}
                // Click en la tarjeta → ir al detalle
                onClick={() => navigate(`/pelicula/${pelicula.id}`)}
                // Click en "Agregar al carrito"
                onAddToCart={() => {
                  dispatch(
                    addToCart({
                      movie_id: pelicula.id,
                      title: pelicula.title,
                    })
                  );
                  // Notificación visual personalizada con nombre de la peli
                  toast.success(`¡Agregaste ‘${pelicula.title}’ al carrito!`);
                }}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}

export default Home;
