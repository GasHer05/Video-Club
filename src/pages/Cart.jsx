// import { useSelector } from 'react-redux';

// export default function Cart() {
//   const cart = useSelector((state) => state.cart);

//   return (
//     <>
//       <h2>Carrito</h2>
//       <ul>
//         {cart.map((movie) => {
//           return <li>{movie.name}</li>;
//         })}
//       </ul>
//     </>
//   );
// }

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
          {cart.map((movie) => (
            <li key={movie.id} className="cart-item">
              <span className="cart-title">{movie.name}</span>
              <span className="cart-price">
                $ {(movie.price || 0).toFixed(2)}
              </span>
              <span>x{movie.qty || 1}</span>
              <div className="qty-controls">
                <button onClick={() => dispatch(decreaseQty(movie.id))}>
                  -
                </button>
                <span className="cart-qty">{movie.qty || 1}</span>
                <button onClick={() => dispatch(increaseQty(movie.id))}>
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => dispatch(removeMovie(movie.id))}
                title="Eliminar del carrito"
              >
                ❌
              </button>
            </li>
          ))}
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
