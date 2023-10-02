import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import logo from "../logoColleponi.png";

const Room = () => {
  const [isCantoVentoDetailOpen, setCantoVentoDetailOpen] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/appartamentini/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApartments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "C'è stato un errore nel recuperare gli appartamenti:",
          err
        );
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>Si è verificato un errore: {error.message}</div>;
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={logo} alt="logo" width={110} height={110} />
        <h3 className="text-center mb-5">I nostri Appartamentini...</h3>
      </div>
      <Container>
        <div className="room-container">
          {apartments.map((apartment) => (
            <div className="room-card" key={apartment.idAppartamentino}>
              <h2 className="text-center">{apartment.nome}</h2>
              <Carousel className="mt-3">
                {apartment.immagini &&
                  apartment.immagini[0] &&
                  Object.keys(apartment.immagini[0]).map((key, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={apartment.immagini[0][key]}
                        alt={`Immagine ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          ))}
        </div>
        <div className="price-list">
          <h3 className="text-center mt-5">Listino Prezzi</h3>
          <div className="price-item">
            <h4>Camera Singola</h4>
            <p>Prezzo a notte: $100</p>
          </div>
          <div className="price-item">
            <h4>Camera Doppia</h4>
            <p>Prezzo a notte: $150</p>
          </div>
          <div className="price-item">
            <h4>Suite Deluxe</h4>
            <p>Prezzo a notte: $250</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Room;
