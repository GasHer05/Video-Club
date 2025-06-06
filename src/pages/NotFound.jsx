import "./NotFound.css";

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Error 404</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/" style={{ color: "#ffc107", fontWeight: "bold" }}>
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;
