import { Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelicula/:id" element={<MovieDetail />} />
        <Route path="/sobre-este-proyecto" element={<SobreEsteProyecto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
