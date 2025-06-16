import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import "./Checkout.css";

/**
 * Página Checkout:
 * Muestra el resumen de la orden y permite confirmar la compra.
 */
function Checkout() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingOrder, setLoadingOrder] = useState(false);

  // Redirecciona si no hay sesión iniciada o carrito vacío
  useEffect(() => {
    if (!user || !token) {
      toast.error("Debes iniciar sesión para finalizar tu compra.");
      navigate("/login");
    }
    if (!cartItems.length) {
      toast.info("No hay películas en el carrito.");
      navigate("/carrito");
    }
  }, [user, token, cartItems, navigate]);

  // Calcula el precio por película usando el rating
  const getPrice = (rating) => {
    return rating ? rating * 3 : 0;
  };

  // Total final del pedido
  const total = cartItems.reduce((sum, movie) => {
    const price = getPrice(movie.rating);
    return sum + price * movie.qty;
  }, 0);

  // Enviar orden al backend
  const handleConfirmOrder = async () => {
    setLoadingOrder(true);
    try {
      const API_BASE = "https://ha-videoclub-api-g1.vercel.app";
      const orderData = {
        type: "movie",
        data: cartItems.map((item) => ({
          movie_id: item.movie_id,
          title: item.title,
          qty: item.qty,
          rating: item.rating, // Incluye rating para registrar el valor
        })),
      };

      await axios.post(`${API_BASE}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(clearCart());
      toast.success("¡Compra realizada con éxito!");
      navigate("/perfil");
    } catch (err) {
      toast.error("No se pudo completar la compra. Intenta nuevamente.");
    } finally {
      setLoadingOrder(false);
    }
  };

  const handleBackToCart = () => {
    navigate("/carrito");
  };

  if (!user) return <Loader />;

  return (
    <main className="checkout-container">
      <h1>Confirmar compra</h1>

      {/* Sección de películas */}
      <section className="checkout-section">
        <h2>Películas seleccionadas</h2>
        <ul className="checkout-movies-list">
          {cartItems.map((item) => {
            const price = getPrice(item.rating);
            return (
              <li key={item.movie_id}>
                <span className="movie-title">{item.title}</span>
                <span className="movie-qty">x{item.qty}</span>
                <span className="movie-price">${price.toFixed(2)} c/u</span>
              </li>
            );
          })}
        </ul>
        <div className="checkout-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </section>

      {/* Sección de datos del usuario */}
      <section className="checkout-section">
        <h2>Tus datos</h2>
        <ul className="user-data-list">
          <li>
            <strong>Nombre:</strong> {user.firstname} {user.lastname}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Dirección:</strong> {user.address}
          </li>
          <li>
            <strong>Teléfono:</strong> {user.phone}
          </li>
        </ul>
      </section>

      {/* Acciones */}
      <div className="checkout-actions">
        <button
          type="button"
          className="back-to-cart-btn"
          onClick={handleBackToCart}
          disabled={loadingOrder}
        >
          Volver al carrito
        </button>
        <button
          type="button"
          className="confirm-order-btn"
          onClick={handleConfirmOrder}
          disabled={loadingOrder}
        >
          {loadingOrder ? <Loader size={20} /> : "Confirmar compra"}
        </button>
      </div>
    </main>
  );
}

export default Checkout;
