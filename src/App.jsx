import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute"; // Componente para proteger rutas privadas

// Componentes principales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas públicas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetail";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
    </div>
  );
}

export default App;
