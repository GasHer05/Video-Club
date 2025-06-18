import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute"; // Componente para proteger rutas privadas

// Importa ToastContainer y CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componentes principales
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import SobreEsteProyecto from "./pages/SobreEsteProyecto";
import Footer from "./components/Footer";

// Páginas públicas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetail";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import SobreEsteProyecto from "./pages/SobreEsteProyecto";
import NotFound from "./pages/NotFound";

// Páginas privadas (futuras o ya creadas)
import Perfil from "./pages/Perfil"; // 🔒 Ejemplo de ruta privada protegida
// También podrías agregar: Carrito.jsx, Checkout.jsx, Ordenes.jsx, etc.

import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      {/* Definimos las rutas disponibles */}
      <Routes>
        {/* Rutas públicas (siempre accesibles) */}
        <Route path="/" element={<Home />} />
        <Route path="/pelicula/:id" element={<MovieDetail />} />
<<<<<<< HEAD
=======
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
>>>>>>> 65f26692715724117ae9425366085364e2d50ef6
        <Route path="/sobre-este-proyecto" element={<SobreEsteProyecto />} />

        {/* Rutas protegidas - solo si hay sesión activa */}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        {/* Página para rutas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      {/* ToastContainer SIEMPRE debe ir aquí, una sola vez en la app */}
      <ToastContainer
        position="bottom-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
