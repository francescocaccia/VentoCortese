import React, { useState, useEffect } from "react";
import logo from "../logoColleponi.png";
const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1547551137-47968522961f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1496492699470-7b0c53d0cb0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://plus.unsplash.com/premium_photo-1687960116689-38c34910d26f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      className="slideshow"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      <div className="text-over-image d-flex flex-column align-items-center justify-content-center">
        <div>
          <img src={logo} alt="logo" width={90} height={90} />
        </div>
        <div>
          <p>Benvenuti a VentoCortese, eleganza e comfort</p>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
