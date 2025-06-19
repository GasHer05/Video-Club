import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await axios.post(
        "https://ha-videoclub-api-g1.vercel.app/users",
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("¡Registro exitoso! Inicia sesión para continuar.");
      navigate("/login");
    } catch (error) {
      setError("Ocurrió un error al registrar el usuario.");
      console.error(error);
    }
  };

  return (
    <div className="container" id="registerContainer">
      <div className="form-section">
        <h1 className="form-title">Registro</h1>
        <p className="form-subtitle">Crea tu nueva cuenta</p>

        {/* Mensaje de error */}
        {error && <div className="alert alert-error">{error}</div>}

        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="María"
              value={formData.firstName}
              onInput={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Ortiz"
              value={formData.lastName}
              onInput={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Yi 2266"
              value={formData.address}
              onInput={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  address: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="099776655"
              value={formData.phone}
              onInput={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerEmail">Email</label>
            <input
              type="email"
              id="registerEmail"
              name="email"
              placeholder="algo@server.com"
              value={formData.email}
              onInput={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerPassword">Contraseña</label>
            <input
              type="password"
              id="registerPassword"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onInput={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn" id="registerBtn">
            <span id="registerBtnText">Crear Cuenta</span>
          </button>
        </form>

        <div className="switch-form">
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
