import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Componente envoltorio para proteger rutas privadas
 */
function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);

  // Si NO hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza el componente protegido
  return children;
}

export default PrivateRoute;
