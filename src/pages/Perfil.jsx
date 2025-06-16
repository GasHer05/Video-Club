import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { logout, updateUser, deleteUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

/**
 * Página Perfil: muestra los datos personales del usuario y su historial de órdenes,
 * y permite editar o eliminar la cuenta.
 */
function Perfil() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos usuario y token desde el store
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // Estados locales para órdenes, carga y formulario
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const API_BASE = "https://ha-videoclub-api-g1.vercel.app";

  // Cargar órdenes y sincronizar datos del usuario en formulario
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error al obtener las órdenes:", err);
        toast.warn("No se pudieron cargar tus órdenes.");
      } finally {
        setLoading(false);
      }
    };

    if (token && user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        password: "",
      });
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token, user]);

  if (loading) return <Loader />;

  const isValidUser = user && typeof user === "object" && !user.error;

  const getPriceFromRating = (rating) => {
    return rating ? rating * 3 : 0;
  };

  // 🔁 Actualizar datos del usuario
  const handleUpdate = async () => {
    try {
      const updates = { ...formData };
      if (!formData.password) delete updates.password;

      const result = await dispatch(
        updateUser({ id: user.id, updates, token })
      );

      if (updateUser.fulfilled.match(result)) {
        toast.success("Perfil actualizado correctamente.");
      } else {
        toast.error(result.payload || "No se pudo actualizar.");
      }
    } catch (err) {
      toast.error("Error inesperado al actualizar.");
    }
  };

  // ❌ Eliminar cuenta del usuario
  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?"))
      return;

    try {
      const result = await dispatch(deleteUser({ id: user.id, token }));
      if (deleteUser.fulfilled.match(result)) {
        dispatch(logout());
        toast.success("Cuenta eliminada correctamente.");
        navigate("/");
      } else {
        toast.error(result.payload || "Error al eliminar cuenta.");
      }
    } catch (err) {
      toast.error("Error inesperado al eliminar cuenta.");
    }
  };

  return (
    <main className="perfil-container">
      <h1>Perfil del usuario</h1>

      {!isValidUser ? (
        <p style={{ color: "#ffc107", textAlign: "center" }}>
          No se pudieron cargar los datos del usuario. Intenta nuevamente.
        </p>
      ) : (
        <>
          {/* Datos personales editables */}
          <section className="perfil-section">
            <h2>Editar perfil</h2>
            <form className="perfil-edit-form">
              <label>Nombre</label>
              <input
                type="text"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
              />
              <label>Apellido</label>
              <input
                type="text"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
              />
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label>Dirección</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <label>Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <label>Contraseña (opcional)</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <div className="perfil-actions">
                <button type="button" onClick={handleUpdate}>
                  Guardar cambios
                </button>
                <button type="button" onClick={handleDelete} className="danger">
                  Eliminar cuenta
                </button>
              </div>
            </form>
          </section>

          {/* Historial de órdenes */}
          <section className="perfil-section">
            <h2>Órdenes realizadas</h2>
            {orders.length === 0 ? (
              <p className="perfil-no-orders">
                No tienes órdenes realizadas aún.
              </p>
            ) : (
              <ul className="perfil-orders-list">
                {orders.map((order) => {
                  const orderTotal = order.data.reduce((sum, movie) => {
                    const price = getPriceFromRating(movie.rating);
                    return sum + price * movie.qty;
                  }, 0);

                  return (
                    <li key={order.order_id} className="perfil-order-item">
                      <span className="order-date">
                        Fecha:{" "}
                        {new Date(order.createdAt).toLocaleString("es-ES", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>

                      <ul className="order-movies-list">
                        {order.data.map((movie) => {
                          const price = getPriceFromRating(movie.rating);
                          return (
                            <li key={`${order.order_id}-${movie.movie_id}`}>
                              <span className="movie-title">{movie.title}</span>
                              <span className="movie-qty">x{movie.qty}</span>
                              <span className="movie-price">
                                {price > 0
                                  ? `($${price.toFixed(2)} c/u)`
                                  : "(sin precio)"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      <strong>Total: ${orderTotal.toFixed(2)}</strong>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Perfil;
