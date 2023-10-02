import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DetailsRoom = ({ apartments }) => {
  const { id } = useParams();
  const apartment = apartments.find(
    (apt) => apt.idAppartamentino === parseInt(id)
  );

  if (!apartment) {
    return <div>Appartamento non trovato</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <Card className="custom-card">
            <Card.Body>
              <Card.Title className="custom-card-title font-weight-bold">
                {apartment.nome}
              </Card.Title>
              <Card.Text className="custom-card-text">
                {apartment.descrizione}
              </Card.Text>
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
              <Link to="/Room">Torna alla lista degli appartamenti</Link>
            </Card.Footer>
          </Card>
        </div>
        <div className="col-md-4">
          <img
            src={apartment.immagini[0].url}
            alt={apartment.nome}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsRoom;
