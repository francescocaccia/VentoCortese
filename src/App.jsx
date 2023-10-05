import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Room from "./components/Room";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import Contacts from "./components/Contacts";
import Cart from "./components/Cart";
import DetailsRoom from "./components/DetailsRoom";
import Register from "./components/Register";
import { useDispatch } from "react-redux";
import Login from "./components/Login";
import Mapp from "./components/Mapp";

function App() {
  const [userID, setUserID] = useState("");
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      // puoi configurare le opzioni qui se necessario
    });
  }, []);

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/appartamentini/all")
      .then((response) => response.json())
      .then((data) => {
        setApartments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  const updateUserID = (id) => {
    dispatch(setUserIDAction(id));
    localStorage.setItem("userID", id); // salva l'userID nel localStorage
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Room" element={<Room apartments={apartments} />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/room/:id"
            element={<DetailsRoom apartments={apartments} userID={userID} />}
          />
          <Route
            path="/register"
            element={<Register setUserID={updateUserID} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/mapp"
            element={<Mapp lat={43.4373176} lng={12.9091765} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
