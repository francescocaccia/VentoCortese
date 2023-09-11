import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Room from "./components/Room";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Room" element={<Room />} />
          <Route path="/Shop" element={<Shop />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
