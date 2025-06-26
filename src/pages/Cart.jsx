import { useSelector, useDispatch } from "react-redux";
import {
  removeMovie,
  increaseQty,
  decreaseQty,
  reset,
} from "../store/cartSlice"; // <-- agrega reset aquí
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calcula el total
  const total = cart.reduce(
    (acc, movie) => acc + (movie.price || 0) * (movie.qty || 1),
    0
  );

  return (
    <div className="cart-container">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => {
            console.log("item:", item);

            return (
              <li key={item.id} className="cart-item">
                {/* Imagen alineada a la izquierda */}
                <img
                  className="cart-img"
                  src={`https://image.tmdb.org/t/p/w92${item.imagen}`}
                  alt={item.name}
                  style={{
                    width: 48,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginRight: 12,
                    background: "#232323",
                  }}
                />
                <span className="cart-title">{item.name}</span>
                <span className="cart-price">
                  $ {(item.price || 0).toFixed(2)}
                </span>
                <span>x{item.qty || 1}</span>
                <div className="qty-controls">
                  <button onClick={() => dispatch(decreaseQty(item.id))}>
                    -
                  </button>
                  <span className="cart-qty">{item.qty || 1}</span>
                  <button onClick={() => dispatch(increaseQty(item.id))}>
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeMovie(item.id))}
                  title="Eliminar del carrito"
                >
                  ❌
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <div className="cart-summary">
            <span className="cart-total">
              Total: <b>$ {total.toFixed(2)}</b>
            </span>
          </div>
          <button className="cart-reset-btn" onClick={() => dispatch(reset())}>
            Vaciar carrito
          </button>
        </>
      )}

      {cart.length > 0 && token && (
        <button className="order-btn" onClick={() => navigate("/checkout")}>
          Checkout
        </button>
      )}
      {cart.length > 0 && !token && (
        <button className="login-warning" onClick={() => navigate("/login")}>
          ¡Inicia sesión para finalizar tu alquiler!
        </button>
      )}
    </div>
  );
}
