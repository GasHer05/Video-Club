import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Detectamos si hay sesión activa
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Borramos token y user
    navigate("/login"); // Redirigimos al login
  };

  return (
    <header className="header-glass">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-white">MOVIE</span>
            <span className="logo-yellow">HACK</span>
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sobre-este-proyecto">Sobre Este Proyecto</Link>
          </li>

          {/* Usuario logueado o botón de login */}
          {!token ? (
            <li>
              <Link to="/login" className="login-button">
                Login
              </Link>
            </li>
          ) : (
            <li className="user-info">
              {/* Mostramos el nombre real */}
              <span className="username">
                👤 {user?.firstname || "Usuario"}
              </span>

              {/* Logout */}
              <button onClick={handleLogout} className="logout-btn">
                🔓 Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
