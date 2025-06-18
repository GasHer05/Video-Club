import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // Usamos el nuevo thunk
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "./Login.css";

function Login() {
  // Estados locales del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manejador del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) {
        const user = result.payload.user;
        toast.success(`Bienvenido/a ${user.firstname || email}`);
        navigate("/perfil");
      } else {
        toast.error("Email o contraseña incorrectos");
      }
    } catch (error) {
      toast.error("Error al intentar ingresar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <h1>Iniciar sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? <Loader size={20} /> : "Ingresar"}
        </button>
      </form>

      <p>
        ¿No tienes cuenta?{" "}
        <a href="/register" className="register-link">
          Registrate aquí
        </a>
      </p>
    </main>
  );
}

export default Login;
