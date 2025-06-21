import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../store/authSlice";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://ha-videoclub-api-g1.vercel.app/tokens",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      console.log("-------------------------");

      dispatch(
        setUserAuth({
          token: response.data.token,
          userId: response.data.userId,
        })
      );
      toast.success("Bienvenido, has iniciado sesión");

      navigate("/");
    } catch (error) {
      setError("Usuario o contraseña incorrectos");
      console.error(error);
    }
  };

  return (
    <div className="container" id="loginContainer">
      <div className="form-section">
        <h1 className="form-title">Iniciar Sesión</h1>

        {/* Mensaje de error si las credenciales fallan */}
        {error && <div className="alert alert-error">{error}</div>}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onInput={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: event.target.value,
                }))
              }
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Contraseña</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onInput={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }))
              }
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn" id="loginBtn">
            <span id="loginBtnText">Iniciar Sesión</span>
          </button>
        </form>

        <div className="switch-form">
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
