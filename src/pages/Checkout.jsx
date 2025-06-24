// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { reset } from "../store/cartSlice"; // Asumimos que 'reset' vacía el carrito
// import "./Checkout.css";
// import axios from "axios";

// export default function Checkout() {
//   // Datos del usuario logueado (para autocompletar)
//   const { user } = useSelector((state) => state.auth);
//   const cart = useSelector((state) => state.cart);
//   const { token } = useSelector((state) => state.auth);

//   // Navegación y dispatch para limpiar carrito
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Estado local para formulario y mensaje de éxito
//   const [form, setForm] = useState({
//     firstname: user?.firstname || "",
//     lastname: user?.lastname || "",
//     address: user?.address || "",
//     phone: user?.phone || "",
//   });
//   const [success, setSuccess] = useState("");

//   // Sumar total del carrito
//   const total = cart.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.qty || 1),
//     0
//   );

//   // Manejar cambio en formulario
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Confirmar transacción (enviar orden)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Opcional: validaciones extras

//     try {
//       await axios.post(
//         "https://ha-videoclub-api-g1.vercel.app/orders",
//         {
//           type: "movie",
//           data: cart.map((item) => ({
//             movie_id: item.id,
//             title: item.name,
//             qty: item.qty || 1,
//             price: item.price || 0,
//           })),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Limpiar carrito y mostrar éxito
//       dispatch(reset());
//       setSuccess(
//         "¡Transacción exitosa! Podrás encontrar tus órdenes en tu perfil."
//       );
//       setTimeout(() => navigate("/"), 2300); // Volver al Home tras 2s
//     } catch {
//       setSuccess("Hubo un error al procesar la transacción.");
//     }
//   };

//   return (
//     <div className="checkout-wrapper">
//       <h1 className="checkout-title">Ya casi son tuyas!</h1>
//       <p className="checkout-subtitle">
//         Completá el formulario y confirmá tu compra.
//       </p>
//       <div className="checkout-main">
//         <form className="checkout-form" onSubmit={handleSubmit}>
//           <h2>Contacto</h2>
//           <div className="checkout-field">
//             <label>Nombre</label>
//             <div className="checkout-static-field">{form.firstname}</div>
//           </div>
//           <div className="checkout-field">
//             <label>Apellido</label>
//             <div className="checkout-static-field">{form.lastname}</div>
//           </div>
//           <div className="checkout-field">
//             <label>Dirección</label>
//             <div className="checkout-static-field">{form.address}</div>
//           </div>
//           <div className="checkout-field">
//             <label>Teléfono</label>
//             <div className="checkout-static-field">{form.phone}</div>
//           </div>
//           <button className="checkout-btn" type="submit">
//             Confirmar Transacción
//           </button>
//           {success && <div className="checkout-success">{success}</div>}
//         </form>
//         <section className="checkout-items">
//           <h2>Items</h2>
//           <hr />
//           <ul>
//             {cart.map((item) => (
//               <li key={item.id} className="checkout-item">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w92${item.imagen}`}
//                   alt={item.name}
//                   className="checkout-img"
//                 />
//                 <div>
//                   <b>{item.name}</b>
//                   <div>Cantidad: {item.qty || 1}</div>
//                 </div>
//                 <span className="checkout-item-price">
//                   $ {(item.price * (item.qty || 1)).toFixed(2)}
//                 </span>
//               </li>
//             ))}
//           </ul>
//           <hr />
//           <div className="checkout-summary-row">
//             <span>Subtotal:</span>
//             <span>${total.toFixed(2)}</span>
//           </div>
//           <div className="checkout-summary-row">
//             <span>Envío:</span>
//             <span>Gratis</span>
//           </div>
//           <div className="checkout-total">
//             Total: <b>${total.toFixed(2)}</b>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reset } from "../store/cartSlice"; // Acción para vaciar el carrito
import "./Checkout.css";
import axios from "axios";

/**
 * Checkout.jsx
 * Permite al usuario logueado confirmar la transacción, mostrando sus datos y el resumen del carrito.
 * Los datos de contacto se muestran en solo lectura (no se pueden editar).
 */

export default function Checkout() {
  // Obtiene usuario y token de Redux
  const { user, token } = useSelector((state) => state.auth);
  // Carrito actual desde Redux
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mensaje de éxito/error
  const [success, setSuccess] = useState("");

  // Estado para datos de contacto (sólo para mostrar, no editar)
  const [form, setForm] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    address: user?.address || "",
    phone: user?.phone || "",
  });

  // Si user cambia después, actualiza el formulario
  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Calcula el total del carrito
  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  // Cuando confirma la transacción
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar orden al backend
      await axios.post(
        "https://ha-videoclub-api-g1.vercel.app/orders",
        {
          type: "movie",
          data: cart.map((item) => ({
            movie_id: item.id,
            title: item.name,
            qty: item.qty || 1,
            price: item.price || 0,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Vacía el carrito y muestra mensaje de éxito
      dispatch(reset());
      setSuccess(
        "¡Transacción exitosa! Podrás encontrar tus órdenes en tu perfil."
      );
      // Redirige al Home después de 2,3 segundos
      setTimeout(() => navigate("/"), 2300);
    } catch {
      setSuccess("Hubo un error al procesar la transacción.");
    }
  };

  return (
    <div className="checkout-wrapper">
      <h1 className="checkout-title">Ya casi son tuyas!</h1>
      <p className="checkout-subtitle">
        Completá el formulario y confirmá tu compra.
      </p>
      <div className="checkout-main">
        {/* --------- FORMULARIO DE CONTACTO SOLO LECTURA --------- */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Contacto</h2>
          <div className="checkout-field">
            <label>Nombre</label>
            <div className="checkout-static-field">{form.firstname}</div>
          </div>
          <div className="checkout-field">
            <label>Apellido</label>
            <div className="checkout-static-field">{form.lastname}</div>
          </div>
          <div className="checkout-field">
            <label>Dirección</label>
            <div className="checkout-static-field">{form.address}</div>
          </div>
          <div className="checkout-field">
            <label>Teléfono</label>
            <div className="checkout-static-field">{form.phone}</div>
          </div>
          <button className="checkout-btn" type="submit">
            Confirmar Transacción
          </button>
          {success && <div className="checkout-success">{success}</div>}
        </form>

        {/* --------- ITEMS DEL CARRITO Y RESUMEN --------- */}
        <section className="checkout-items">
          <h2>Items</h2>
          <hr />
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="checkout-item">
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.imagen}`}
                  alt={item.name}
                  className="checkout-img"
                />
                <div>
                  <b>{item.name}</b>
                  <div>Cantidad: {item.qty || 1}</div>
                </div>
                <span className="checkout-item-price">
                  $ {(item.price * (item.qty || 1)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="checkout-summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <div className="checkout-total">
            Total: <b>${total.toFixed(2)}</b>
          </div>
        </section>
      </div>
    </div>
  );
}
