import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "./Register.css";

/**
 * Componente de registro de nuevos usuarios.
 */
function Register() {
  // Estados para cada campo del formulario
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(
        register({ firstname, lastname, address, phone, email, password })
      );

      if (register.fulfilled.match(result)) {
        toast.success(`¡Registro exitoso, ${firstname}!`);
        navigate("/login");
      } else {
        const msg =
          result.payload ||
          result.error?.message ||
          "No se pudo registrar. Intenta con otro email.";
        toast.error(msg);
      }
    } catch (error) {
      toast.error("Error inesperado al intentar registrarse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-container">
      <h1>Registro de usuario</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="firstname">Nombre</label>
        <input
          autoFocus
          id="firstname"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />

        <label htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        <label htmlFor="address">Dirección</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
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

        <button type="submit" disabled={loading} className="register-btn">
          {loading ? <Loader size={20} /> : "Registrarme"}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="login-link">
          Inicia sesión aquí
        </a>
      </p>
    </main>
  );
}

export default Register;
