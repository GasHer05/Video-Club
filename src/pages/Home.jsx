import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";
import "../App.css";

function Home() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  // Si input está vacío → cargar populares
  useEffect(() => {
    if (searchInputValue.trim() === "") {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES`
        )
        .then((res) => {
          setPeliculas(res.data.results);
          setError(false);
        })
        .catch((err) => {
          console.error("Error al cargar películas populares:", err);
          setError(true);
        });
    }
  }, [searchInputValue]);

  //  Si el usuario escribe → hacer búsqueda
  useEffect(() => {
    if (searchInputValue.trim() === "") return;

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES&query=${searchInputValue}`
      )
      .then((res) => {
        if (res.data.results.length === 0) {
          setError(true);
          setPeliculas([]);
        } else {
          setPeliculas(res.data.results);
          setError(false);
        }
      })
      .catch((err) => {
        console.error("Error al buscar películas:", err);
        setError(true);
      });
  }, [searchInputValue]);

  return (
    <>
      <section className="imagSection">
        <div className="hero-text">
          <h1>¡Tus películas favoritas!</h1>
          <h2>Buscá entre miles de títulos...</h2>
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
          <input
            type="text"
            placeholder="Escribí el nombre de la película..."
            value={searchInputValue}
            onInput={handleInputChange}
            className="search-input"
          />
        </div>

        {error && (
          <p className="error-message">
            Lo sentimos, no se encontraron películas con el título buscado.
          </p>
        )}

        {peliculas.length > 0 && (
          <section className="movies-grid">
            {peliculas.map((pelicula) => (
              <Movie
                key={pelicula.id}
                id={pelicula.id}
                nombre={pelicula.title}
                imagen={pelicula.poster_path}
                onClick={() => navigate(`/pelicula/${pelicula.id}`)}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}

export default Home;
