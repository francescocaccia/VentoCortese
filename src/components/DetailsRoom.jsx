import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPrenotazioni, fetchPrenotazioniError } from "../Redux/action";
import { Button, Card, Carousel } from "react-bootstrap";
import CalendarComponent from "./CalendarComponent";

const DetailsRoom = ({ apartments, userID }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prenotazioni = useSelector((state) => state.prenotazioni);

  useEffect(() => {
    const fetchData = async () => {
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
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
        </div>
        <div className="col-md-4">
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
          <Link to="/login">
            <Button>login</Button>
          </Link>

          <CalendarComponent
            id={id}
            prenotazioni={prenotazioni}
            idCliente={userID}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsRoom;
