import { useSelector } from "react-redux";
import "./Perfil.css";

function Perfil() {
  // Usamos useSelector para acceder al usuario desde Redux
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="perfil-container">
      <h1>Mi Perfil</h1>

      {/* Mostramos los datos si el usuario existe */}
      {user ? (
        <div className="perfil-info">
          <p>
            <strong>Nombre:</strong> {user.firstname}
          </p>
          <p>
            <strong>Apellido:</strong> {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Dirección:</strong> {user.address}
          </p>
          <p>
            <strong>Teléfono:</strong> {user.phone}
          </p>
        </div>
      ) : (
        <p>No hay datos de usuario disponibles.</p>
      )}
    </main>
  );
}

export default Perfil;
