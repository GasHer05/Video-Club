import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import "../App.css";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="header-glass">
      <div className="navbar">
        <div className="logo">
          <Link to="/" onClick={cerrarMenu}>
            <span className="logo-white">MOVIE</span>
            <span className="logo-yellow">HACK</span>
          </Link>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-links ${menuAbierto ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={cerrarMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/sobre-este-proyecto" onClick={cerrarMenu}>
              Sobre Este Proyecto
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={cerrarMenu}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
