import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logoColleponi.png";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
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
    <Container>
      <div className="d-flex flex-column justify-content-center align-items-center">
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
      </div>

      <div className="price-list mb-5">
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

      <Row className="custom-card-row">
        {apartments.slice(0, 4).map((apartment, index) => (
          <Col md={6} key={index} className="custom-card-col">
            <Link
              to={`/room/${apartment.idAppartamentino}`}
              className="text-decoration-none text-dark"
            >
              <Card
                className="custom-card border-0"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                data-aos-delay={`${index * 200}`} // Puoi regolare il delay in base alle tue esigenze
              >
                <Carousel className="custom-carousel">
                  {Object.entries(apartment.immagini[0])
                    .filter(
                      ([, imageUrl]) =>
                        typeof imageUrl === "string" && imageUrl.trim() !== ""
                    )
                    .map(([key, imageUrl], idx) => (
                      <Carousel.Item key={idx} className="custom-carousel-item">
                        <img
                          className="d-block w-100 custom-carousel-img"
                          src={imageUrl}
                          alt={`Immagine ${idx + 1} di ${apartment.nome}`}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>

                <Card.Body className="custom-card-body bg-light">
                  <Card.Title className="custom-card-title font-weight-bold">
                    {apartment.nome}
                  </Card.Title>
                  <Card.Text className="custom-card-text">
                    {apartment.descrizione}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="custom-card-footer bg-light">
                  <div className="d-flex flex-column">
                    <small className="text-muted custom-card-footer-text">
                      Camere: {apartment.numeroDiCamere}
                    </small>
                    <small className="text-muted custom-card-footer-text mt-2">
                      Disponibilità:
                      {apartment.disponibilita ? (
                        <FaCheck className="ms-2 text-success" />
                      ) : (
                        <ImCross className="ms-2 text-danger bold" />
                      )}
                    </small>
                  </div>
                </Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {apartments[4] && (
        <Row className="custom-card-row">
          <Col md={12} className="custom-card-col">
            <Link
              to={`/room/${apartments[4].idAppartamentino}`}
              className="text-decoration-none text-dark"
            >
              <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <Card className="custom-card border-0 last-card">
                  <Carousel className="custom-carousel last-carousel">
                    {Object.entries(apartments[4].immagini[0])
                      .filter(
                        ([, imageUrl]) =>
                          typeof imageUrl === "string" && imageUrl.trim() !== ""
                      )
                      .map(([key, imageUrl], idx) => (
                        <Carousel.Item
                          key={idx}
                          className="custom-carousel-item"
                        >
                          <img
                            className="d-block w-100 custom-carousel-img"
                            src={imageUrl}
                            alt={`Immagine ${idx + 1} di ${apartments[4].nome}`}
                          />
                        </Carousel.Item>
                      ))}
                  </Carousel>

                  <Card.Body className="custom-card-body bg-light">
                    <Card.Title className="custom-card-title font-weight-bold">
                      {apartments[4].nome}
                    </Card.Title>
                    <Card.Text className="custom-card-text">
                      {apartments[4].descrizione}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="custom-card-footer bg-light">
                    <div className="d-flex flex-column">
                      <small className="text-muted custom-card-footer-text">
                        Camere: {apartments[4].numeroDiCamere}
                      </small>
                      <small className="text-muted custom-card-footer-text mt-2">
                        Disponibilità:
                        {apartments[4].disponibilita ? (
                          <FaCheck className="ms-2 text-success" />
                        ) : (
                          <ImCross className="ms-2 text-danger bold" />
                        )}
                      </small>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Room;
