import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // en formData es un objeto que guarda lo que el usuario escribe en el formulario y setFormData es la función que se usa para actualizar eso.
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState(null); // creamos un estado donde vamos a guardar un posible error que pase al tratar de registrarse.

  // Nuevo estado para mostrar éxito visualmente
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    //Esta función se activa cada vez que escribís algo en un campo del formulario
    setFormData({
      ...formData, //Copia todo lo que ya tenías antes.
      [e.target.name]: e.target.value, //[e.target.name] → Actualiza solo ese campo específico.
    });
  };

  //Esta función se activa cuando hacés clic en el botón “Registrarse”
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el formulario recargue la página
    setError(""); // limpiamos errores anteriores
    setSuccessMessage(null); // reseteamos mensaje anterior

    try {
      const response = await fetch(
        "https://ha-videoclub-api-g1.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const message =
          errorData?.message ||
          "Hubo un error al registrar. Verificá los datos.";
        throw new Error(message);
      }

      const data = await response.json(); // recibimos los datos del nuevo usuario creado
      console.log("Usuario creado:", data);

      // Mostrar mensaje de éxito
      setSuccessMessage("🎉 Registro exitoso, redirigiendo...");

      // Esperamos 2 segundos antes de redirigir
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <main className="register-page">
      <h1>Registrarse</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="Nombre"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>

      {/* Mensaje de error si hay problema */}
      {error && <p className="register-error">{error}</p>}

      {/* Mensaje de éxito si todo salió bien */}
      {successMessage && <p className="register-success">{successMessage}</p>}
    </main>
  );
}

export default Register;
