import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

/**
 * Navbar principal, responsivo, con íconos, mobile/hamburger menu y acciones de logout y limpiar carrito.
 */
function Navbar() {
  // Estado para mostrar/ocultar el menú mobile
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Traemos token, user y carrito de Redux
  const { token, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  // Cantidad total de películas en carrito (sumando qty)
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Logout: borra token, usuario y carrito. Redirige a login.
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
    setMenuOpen(false); // Cierra menú en mobile
  };

  // Al clickear cualquier link, cierra el menú mobile
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="header-glass">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <span className="logo-black">MOVIE</span>
            <span className="logo-yellow">HACK</span>
          </Link>
        </div>

        {/* Botón hamburger para mobile */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Links del navbar, clase open para mobile */}
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          <li>
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/sobre-este-proyecto" onClick={handleLinkClick}>
              Sobre Este Proyecto
            </Link>
          </li>

          {/* Carrito, siempre visible */}
          <li>
            <Link
              to="/carrito"
              className="carrito-link"
              onClick={handleLinkClick}
            >
              <FaShoppingCart className="navbar-icon" />
              Carrito
              {totalQty > 0 && (
                <span className="carrito-badge">{totalQty}</span>
              )}
            </Link>
          </li>

          {/* Usuario logueado: perfil y logout. Si no, link a login */}
          {!token ? (
            <li>
              <Link
                to="/login"
                className="login-button"
                onClick={handleLinkClick}
              >
                <FaUserCircle className="navbar-icon" />
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/perfil"
                  className="perfil-link"
                  onClick={handleLinkClick}
                >
                  <FaUserCircle className="navbar-icon" />
                  {user.firstname || "Perfil"}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt className="navbar-icon" />
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
