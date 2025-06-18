import { Routes, Route } from "react-router-dom";

// Componentes principales
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import SobreEsteProyecto from "./pages/SobreEsteProyecto";
import Footer from "./components/Footer";

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
        <Route path="/sobre-este-proyecto" element={<SobreEsteProyecto />} />

        {/* Página para rutas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
