import { Routes, Route } from "react-router-dom";

// Componentes principales
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import Perfil from "./pages/Perfil";

import NotFound from "./pages/NotFound";
import SobreEsteProyecto from "./pages/SobreEsteProyecto";
import Footer from "./components/Footer";

// Librería de toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      {/* Aquí el ToastContainer para los avisos */}
      <ToastContainer position="top-center" autoClose={2300} />

      {/* Definimos las rutas disponibles */}
      <Routes>
        {/* Rutas públicas (siempre accesibles) */}
        <Route path="/" element={<Home />} />
        <Route path="/pelicula/:id" element={<MovieDetail />} />
        <Route path="/sobre-este-proyecto" element={<SobreEsteProyecto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/perfil" element={<Perfil />} /> */}
        {/* Página para rutas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
