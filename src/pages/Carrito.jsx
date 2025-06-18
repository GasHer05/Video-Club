import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

/**
 * Página del Carrito: muestra las películas agregadas y permite modificar cantidades o finalizar la compra.
 */
function Carrito() {
  const items = useSelector((state) => state.cart.items); // Trae los ítems desde Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función que calcula el precio unitario a partir del rating
  const getPrice = (rating) => {
    return rating ? rating * 3 : 0;
  };

  // Calcula subtotal por ítem (precio * cantidad)
  const calculateSubtotal = (item) => {
    return getPrice(item.rating) * item.qty;
  };

  // Calcula el total del carrito
  const total = items.reduce((sum, item) => {
    return sum + calculateSubtotal(item);
  }, 0);

  // Cambia la cantidad del ítem
  const handleQtyChange = (movie_id, value) => {
    const qty = parseInt(value, 10);
    if (!isNaN(qty) && qty >= 0) {
      dispatch(updateQty({ movie_id, qty }));
    }
  };

  // Navega a la pantalla de checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Limpia todo el carrito
  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <main className="carrito-container">
      <h1>Tu Carrito</h1>

      {items.length === 0 ? (
        <p>No tienes películas en el carrito.</p>
      ) : (
        <>
          <ul className="carrito-list">
            {items.map((item) => {
              const price = getPrice(item.rating);
              const subtotal = calculateSubtotal(item);

              return (
                <li key={item.movie_id} className="carrito-item">
                  <div className="movie-info">
                    <span className="movie-title">{item.title}</span>
                    <span className="movie-price">${price.toFixed(2)} c/u</span>
                  </div>
                  <div className="movie-actions">
                    <input
                      type="number"
                      min="0"
                      value={item.qty}
                      onChange={(e) =>
                        handleQtyChange(item.movie_id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => dispatch(removeFromCart(item.movie_id))}
                    >
                      Quitar
                    </button>
                    <span className="subtotal">
                      Subtotal: ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="carrito-summary">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>

          <div className="carrito-actions">
            <button className="clear-btn" onClick={handleClear}>
              Vaciar carrito
            </button>
            <button className="checkout-btn" onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrito;
