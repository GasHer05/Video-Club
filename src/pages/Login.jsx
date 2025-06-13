import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice"; // Acción para guardar token en Redux
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate(); // Esto nos permite cambiar de página desde el código JS
  const dispatch = useDispatch(); // Lo usamos para "despachar" el token al store global

  // Estado del formulario: guarda lo que el usuario escribe
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Acá guardamos un mensaje si hay error (ej: usuario incorrecto)

  // Nuevo estado para mostrar un mensaje de éxito visual
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(""); // Nuevo: mensaje de éxito

  // Se ejecuta cada vez que el usuario escribe algo en el input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Acá usamos el name del input para actualizar el valor correcto
    }));
  };

  // Esto se ejecuta cuando apretamos el botón "Ingresar"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // 1️⃣ Obtenemos el token y userId
      const res = await axios.post(
        "https://ha-videoclub-api-g1.vercel.app/tokens",
        formData
      );
      const { token, userId } = res.data;

      // 2️⃣ Obtenemos los datos del usuario con ese userId
      const userRes = await axios.get(
        `https://ha-videoclub-api-g1.vercel.app/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3️⃣ Despachamos token + usuario al store global
      dispatch(loginSuccess({ token, user: userRes.data }));

      // 4️⃣ Redireccionamos
      setSuccess("Inicio de sesión exitoso.");
      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <main className="login-container">
      <h1>Iniciar Sesión</h1>

      {/*  Formulario controlado */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Ingresá tu email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-login">
          Ingresar
        </button>

        {/*  Mensaje de error si las credenciales son incorrectas */}
        {error && <p className="login-error">{error}</p>}

        {/*  Mensaje visual de éxito */}
        {successMessage && <p className="login-success">{successMessage}</p>}
      </form>

      {/*  Link a la página de registro si aún no tiene cuenta */}
      <p className="login-register-link">
        ¿Todavía no tenés una cuenta? <Link to="/register">Crear cuenta</Link>
      </p>
    </main>
  );
}

export default Login;
