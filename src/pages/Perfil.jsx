import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Perfil.css";
import { clearUserAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * Componente de perfil de usuario.
 * Permite ver, editar y eliminar datos del usuario,
 * y además muestra las órdenes realizadas.
 */

export default function Perfil() {
  // Obtiene el token y userId desde Redux (auth)
  const { token, userId } = useSelector((state) => state.auth);

  // Estados locales
  const [user, setUser] = useState(null); // Datos del usuario
  const [editMode, setEditMode] = useState(false); // Editar datos o solo mostrar
  const [form, setForm] = useState({}); // Formulario para edición
  const [mensaje, setMensaje] = useState(""); // Mensajes de éxito/error
  const [orders, setOrders] = useState([]); // Órdenes del usuario

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Al cargar: pide los datos del usuario
  useEffect(() => {
    if (!userId || !token || editMode) return;
    axios
      .get(`https://ha-videoclub-api-g1.vercel.app/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm(res.data);
      })
      .catch(() => setMensaje("No se pudo obtener los datos del usuario."));
  }, [token, userId, editMode]);

  // Pide las órdenes del usuario logueado
  useEffect(() => {
    if (!userId || !token) return;
    axios
      .get("https://ha-videoclub-api-g1.vercel.app/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setOrders([]));
  }, [token, userId]);

  // PATCH para editar datos de usuario
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `https://ha-videoclub-api-g1.vercel.app/users/${userId}`,
        {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          address: form.address,
          phone: form.phone,
          password: form.password, // Opcional: solo si cambia
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje("Perfil actualizado exitosamente.");
      setEditMode(false);
      // Actualiza los datos de usuario (llama al useEffect)
    } catch {
      setMensaje("Error al actualizar el perfil.");
    }
  };

  // DELETE para eliminar usuario
  const handleDelete = async () => {
    if (
      !window.confirm(
        "¿Seguro que quieres eliminar tu usuario? Esta acción es irreversible."
      )
    )
      return;
    try {
      await axios.delete(
        `https://ha-videoclub-api-g1.vercel.app/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensaje("Usuario eliminado correctamente.");
      // Logout automático y redirección
      dispatch(clearUserAuth());
      navigate("/");
    } catch {
      setMensaje("Error al eliminar el usuario.");
    }
  };

  // Si aún no tiene datos el usuario, muestra "Cargando..."
  if (!user) return <div className="perfil-loading">Cargando perfil...</div>;

  return (
    <div id="perfilContainer">
      <div className="perfil-section">
        <h2>Perfil de usuario</h2>
        {mensaje && <div className="alert">{mensaje}</div>}
        {/* ---------- Vista datos y edición ---------- */}
        {!editMode ? (
          <div>
            <p className="datoPerfil">
              <b>Nombre:</b> {user.firstname} {user.lastname}
            </p>
            <p className="datoPerfil">
              <b>Email:</b> {user.email}
            </p>
            <p className="datoPerfil">
              <b>Dirección:</b> {user.address}
            </p>
            <p className="datoPerfil">
              <b>Teléfono:</b> {user.phone}
            </p>
            <div className="btnPerfil">
              <button onClick={() => setEditMode(true)}>Editar</button>
              <button
                onClick={handleDelete}
                className="eliminar-btn"
                style={{ marginLeft: 8 }}
              >
                Eliminar usuario
              </button>
            </div>
          </div>
        ) : (
          // ------ Formulario de edición de perfil ------
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={form.firstname}
              onChange={(e) =>
                setForm((f) => ({ ...f, firstname: e.target.value }))
              }
              placeholder="Nombre"
              required
            />
            <input
              type="text"
              value={form.lastname}
              onChange={(e) =>
                setForm((f) => ({ ...f, lastname: e.target.value }))
              }
              placeholder="Apellido"
              required
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="Email"
              required
            />
            <input
              type="text"
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              placeholder="Dirección"
            />
            <input
              type="text"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="Teléfono"
            />
            <input
              type="password"
              value={form.password || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              placeholder="Nueva contraseña"
            />
            <button type="submit">Guardar cambios</button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              style={{ marginLeft: 8 }}
            >
              Cancelar
            </button>
          </form>
        )}
      </div>

      {/* --------- SECCIÓN DE ÓRDENES --------- */}
      <div className="orders-section">
        <h3 className="orders-title">Mis Órdenes ({orders.length || 0})</h3>
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => {
            // Calcula el total (si hay precio)
            const orderTotal = Array.isArray(order.data)
              ? order.data.reduce(
                  (acc, item) => acc + (item.price || 0) * (item.qty || 1),
                  0
                )
              : 0;

            return (
              <div className="order-card" key={order.order_id}>
                <div className="order-header">
                  <span>Orden #{order.order_id}</span>
                  <span>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
                <div className="order-content">
                  <div className="order-details">
                    <b>Titular:</b> {user.firstname} {user.lastname}
                    <br />
                    <b>Dirección:</b> {user.address}
                    <br />
                    <b>Teléfono:</b> {user.phone}
                    <br />
                    <b>Email:</b> {user.email}
                  </div>
                  <div className="order-items">
                    <b>Películas alquiladas:</b>
                    <ul>
                      {Array.isArray(order.data) && order.data.length > 0 ? (
                        order.data.map((item, idx) => (
                          <li key={item.movie_id || idx}>
                            {item.title} x{item.qty || 1}
                            {item.price
                              ? ` - $${(item.price * (item.qty || 1)).toFixed(
                                  2
                                )}`
                              : ""}
                          </li>
                        ))
                      ) : (
                        <li>No hay películas en esta orden.</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="order-total">
                  <b>Total: ${orderTotal.toFixed(2)}</b>
                </div>
              </div>
            );
          })
        ) : (
          <div className="orders-title">No tienes órdenes aún.</div>
        )}
      </div>
    </div>
  );
}
