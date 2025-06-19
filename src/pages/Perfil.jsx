// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./Perfil.css";

// /**
//  * Componente de perfil de usuario.
//  * Muestra los datos, permite editarlos o eliminar el usuario.
//  */
// export default function Perfil() {
//   // Trae token y userId de Redux, que se cargan al loguear
//   const token = useSelector((state) => state.token.token);
//   const userId = useSelector((state) => state.token.userId);

//   // Estados locales
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [mensaje, setMensaje] = useState("");

//   // Al montar o cambiar userId/token, pide los datos a la API
//   useEffect(() => {
//     if (!userId || !token) return;
//     axios
//       .get(`https://ha-videoclub-api-g1.vercel.app/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUser(res.data);
//         setForm(res.data);
//       })
//       .catch(() => setMensaje("No se pudo obtener los datos del usuario."));
//   }, [userId, token]);

//   // Envia PATCH para actualizar datos
//   const handleUpdate = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.patch(
//         `https://ha-videoclub-api-g1.vercel.app/users/${userId}`,
//         {
//           firstname: form.firstname,
//           lastname: form.lastname,
//           email: form.email,
//           address: form.address,
//           phone: form.phone,
//           password: form.password, // opcional: solo si cambia
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUser(res.data);
//       setMensaje("Perfil actualizado exitosamente.");
//       setEditMode(false);
//     } catch {
//       setMensaje("Error al actualizar el perfil.");
//     }
//   };

//   // Llama DELETE para eliminar usuario
//   const handleDelete = async () => {
//     if (
//       !window.confirm(
//         "¿Seguro que quieres eliminar tu usuario? Esta acción es irreversible."
//       )
//     )
//       return;
//     try {
//       await axios.delete(
//         `https://ha-videoclub-api-g1.vercel.app/users/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMensaje("Usuario eliminado correctamente.");
//       // Aquí podrías hacer logout automático y redirigir al home
//     } catch {
//       setMensaje("Error al eliminar el usuario.");
//     }
//   };

//   if (!user) return <div>Cargando perfil...</div>;

//   return (
//     <div className="perfil-container">
//       <h2>Perfil de usuario</h2>
//       {mensaje && <div className="alert">{mensaje}</div>}
//       {!editMode ? (
//         <div>
//           <p>
//             <b>Nombre:</b> {user.firstname} {user.lastname}
//           </p>
//           <p>
//             <b>Email:</b> {user.email}
//           </p>
//           <p>
//             <b>Dirección:</b> {user.address}
//           </p>
//           <p>
//             <b>Teléfono:</b> {user.phone}
//           </p>
//           <button onClick={() => setEditMode(true)}>Editar</button>
//           <button
//             onClick={handleDelete}
//             style={{ marginLeft: 8, color: "red" }}
//           >
//             Eliminar usuario
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleUpdate}>
//           <input
//             type="text"
//             value={form.firstname}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, firstname: e.target.value }))
//             }
//             placeholder="Nombre"
//             required
//           />
//           <input
//             type="text"
//             value={form.lastname}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, lastname: e.target.value }))
//             }
//             placeholder="Apellido"
//             required
//           />
//           <input
//             type="email"
//             value={form.email}
//             onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="text"
//             value={form.address}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, address: e.target.value }))
//             }
//             placeholder="Dirección"
//           />
//           <input
//             type="text"
//             value={form.phone}
//             onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
//             placeholder="Teléfono"
//           />
//           <input
//             type="password"
//             value={form.password || ""}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, password: e.target.value }))
//             }
//             placeholder="Nueva contraseña"
//           />
//           <button type="submit">Guardar cambios</button>
//           <button
//             type="button"
//             onClick={() => setEditMode(false)}
//             style={{ marginLeft: 8 }}
//           >
//             Cancelar
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }
