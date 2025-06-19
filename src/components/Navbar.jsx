import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../store/tokenSlice";
import { FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cart = useSelector((state) => state.cart);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

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
          {token ? (
            <li>
              <button
                onClick={() => {
                  dispatch(clearToken());
                  cerrarMenu();
                  navigate("/");
                }}
                className="logout-btn"
                style={{
                  background: "none",
                  border: "none",
                  color: "#b71c1c",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Cerrar sesión
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={cerrarMenu}>
                Iniciar Sesión
              </Link>
            </li>
          )}
          <li className="cart-icon">
            <Link to="/cart" onClick={cerrarMenu}>
              <FiShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
