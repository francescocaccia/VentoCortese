import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logoColleponi.png";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { Link } from "react-router-dom";
import Slideshow from "./Slideshow";
const Room = () => {
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
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="custom-spinner">
          <img src={logo} alt="logo" width={150} height={150} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        Si è verificato un errore: {error.message}
      </div>
    );
  }

  return (
    <>
      <Slideshow />

      {/* <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="img-with-shadow mt-4"
            src={logo}
            alt="logo"
            width={210}
            height={210}
          />
          <div>
            <h3>I nostri appartamentini...</h3>
          </div>
        </div> */}

      {/* <div className="price-list mb-5">
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
        </div> */}
      <Container>
        <Row className="custom-card-row">
          {apartments.map((apartment, index) => (
            <Col key={index} className="custom-card-col">
              <Link
                to={`/room/${apartment.idAppartamentino}`}
                className="text-decoration-none text-dark"
              >
                <Card
                  className="room-elegant-card border-0"
                  style={{ borderRadius: "0" }}
                >
                  {/* Mostra la prima immagine di ogni appartamento */}
                  <Card.Img
                    variant="top"
                    src={
                      Object.entries(apartment.immagini[0]).filter(
                        ([, imageUrl]) =>
                          typeof imageUrl === "string" && imageUrl.trim() !== ""
                      )[0][1] // Accedi al primo URL
                    }
                    alt={apartment.nome}
                    className="room-elegant-card-image"
                  />
                  <div className="room-specific-people-count">
                    <span>
                      <IoIosPeople className="fs-4 size-bold" />
                      Max People: {apartment.capienzaMassima}
                    </span>
                    <span>
                      <HiOutlineArrowsExpand className="fs-5" />
                      Metri m²: {apartment.metriQuadri}
                    </span>
                  </div>
                  <Card.Body className="room-elegant-card-body">
                    <Card.Title className="text-center font-weight-bold">
                      <span>{apartment.nome}</span>
                    </Card.Title>
                    <Card.Text>
                      <span>
                        {apartment.descrizione}fare attenzione al css
                        descrizione breve
                      </span>
                    </Card.Text>
                    <Button
                      className="specific-cta-button btn-dark w-100"
                      style={{ borderRadius: "0" }}
                    >
                      <span> BOOK NOW FOR: {apartment.tariffa}€</span>
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Room;
