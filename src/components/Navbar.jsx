import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserAuth } from "../store/authSlice";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Trae el carrito del store
  const cart = useSelector((state) => state.cart);

  // NUEVO: Suma la cantidad total de películas en el carrito (no solo los productos distintos)
  const totalQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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
            <>
              <li>
                <Link to="/perfil" onClick={cerrarMenu}>
                  Perfil
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(clearUserAuth());
                    cerrarMenu();
                    navigate("/");
                    toast.info("Has cerrado sesión correctamente");
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
            </>
          ) : (
            <li>
              <Link to="/login" onClick={cerrarMenu}>
                Iniciar Sesión
              </Link>
            </li>
          )}
          <li className="cart-icon">
            <Link to="/carrito" onClick={cerrarMenu}>
              <FiShoppingCart size={24} />
              {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
