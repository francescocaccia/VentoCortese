import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPrenotazioni, fetchPrenotazioniError } from "../Redux/action";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import CalendarComponent from "./CalendarComponent";
import AOS from "aos";
import "aos/dist/aos.css";
const DetailsRoom = ({ apartments, userID }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prenotazioni = useSelector((state) => state.prenotazioni);

  useEffect(() => {
    const fetchData = async () => {
      AOS.init({
        duration: 2000, // Durata dell'animazione
        once: false,
      });
      try {
        const response = await fetch(
          `http://localhost:8080/prenotazioni/${id}`
        );
        const data = await response.json();
        dispatch(setPrenotazioni(data));
      } catch (error) {
        console.error("Errore durante il fetch delle prenotazioni:", error);
        dispatch(fetchPrenotazioniError(error));
      }
    };

    fetchData();
  }, [id, dispatch]);

  const apartment = apartments.find(
    (apt) => apt.idAppartamentino == id || apt.idAppartamentino == parseInt(id)
  );

  if (!apartment) {
    return <div>Appartamento non trovato</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="font-weight-bold">
                {apartment.nome}
              </Card.Title>
              <Card.Text>{apartment.descrizione}</Card.Text>
              <Card.Text>
                <strong>Numero di camere:</strong> {apartment.numeroDiCamere}
              </Card.Text>
              <Card.Text>
                <strong>Capienza massima:</strong> {apartment.capienzaMassima}
              </Card.Text>
              <Card.Text>
                <strong>Disponibilità:</strong>{" "}
                {apartment.disponibilita ? "Disponibile" : "Non disponibile"}
              </Card.Text>
              <Card.Text>
                <strong>Tariffa:</strong> {apartment.tariffa} €
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to="/Room" className="text-decoration-none text-dark">
                Torna alla lista degli appartamenti
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Carousel className="custom-carousel">
            {Object.entries(apartment.immagini[0])
              .filter(
                ([, imageUrl]) =>
                  typeof imageUrl === "string" && imageUrl.trim() !== ""
              )
              .map(([key, imageUrl], idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={`${baseDelay * 100}`}
                >
                  <Carousel.Item className="custom-carousel-item">
                    <img
                      className="d-block w-100 custom-carousel-img"
                      src={imageUrl}
                      alt={`Immagine ${idx + 1} di ${apartment.nome}`}
                    />
                  </Carousel.Item>
                </div>
              ))}
          </Carousel>
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col md={12}>
          <CalendarComponent
            id={id}
            prenotazioni={prenotazioni}
            idCliente={userID}
          />
          <Link to="/login">
            <Button>login</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsRoom;
