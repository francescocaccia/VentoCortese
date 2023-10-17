import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import userIcon from "../userIcon.png";
import Login from "./Login";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const daysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMilliseconds = end - start;
    const days = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.floor(days);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserBookings();
  }, []);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:8080/clienti/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
        console.log(data);
        dispatch(setCurrentUser(data.nome));
      } else {
        const errorMessage = await response.text();
        setError(
          `Errore nel recupero dei dettagli dell'utente: ${errorMessage}`
        );
      }
    } catch (error) {
      setError("Errore nel recupero dei dettagli dell'utente.");
    }
  };

  const fetchUserBookings = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:8080/prenotazioni/byCliente/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBookings(data);
      } else {
        const errorMessage = await response.text();
        setError(`Errore nel recupero delle prenotazioni: ${errorMessage}`);
      }
    } catch (error) {
      setError("Errore nel recupero delle prenotazioni.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Sei sicuro di voler effettuare il logout?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userID");
      dispatch({ type: "USER_LOGOUT" });
      navigate("/");
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("it-IT");
  };

  const isUserLoggedIn = () => {
    return !!localStorage.getItem("authToken");
  };

  return (
    <Container className="mt-5 profile-container">
      <Row>
        <Col md={6}>{!isUserLoggedIn() && <Login />}</Col>
        <Col md={6} className="mt-5">
          <Card className="profile-card">
            <Image src={userIcon} roundedCircle className="profile-avatar" />
            <Card.Body>
              <Card.Title className="profile-name">
                {userDetails.nome}
              </Card.Title>
              <Card.Text className="profile-email">
                {userDetails.email}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="w-100"
              >
                Modifica Profilo
              </Button>
              <Button
                variant="danger"
                onClick={handleLogout}
                className="w-100 mt-2"
              >
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} className="mt-5">
          <Card className="bookings-card">
            <Card.Header className="bookings-header">
              Le tue prenotazioni
            </Card.Header>
            <ListGroup variant="flush">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <ListGroup.Item
                    key={booking.idPrenotazione}
                    className="booking-item"
                  >
                    <strong>Appartamento:</strong> {booking.appartamentino.nome}{" "}
                    ({booking.appartamentino.descrizione})
                    <div>
                      <strong>Numero di Camere:</strong>{" "}
                      {booking.appartamentino.numeroDiCamere}
                    </div>
                    <div>
                      <strong>Capacità Massima:</strong>{" "}
                      {booking.appartamentino.capienzaMassima} persone
                    </div>
                    <div>
                      <strong>Tariffa:</strong> {booking.appartamentino.tariffa}
                      € al giorno
                    </div>
                    <div>
                      <strong>Periodo di Prenotazione:</strong> Dal{" "}
                      {formatDate(booking.dataInizio)} al{" "}
                      {formatDate(booking.dataFine)}(
                      {daysBetween(booking.dataInizio, booking.dataFine)}{" "}
                      giorni)
                    </div>
                    <div>
                      <strong>Importo Totale:</strong> {booking.importoTotale}€
                    </div>
                    <div className="booking-actions">
                      <Button
                        variant="outline-warning"
                        className="d-inline-block"
                      >
                        Modifica
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="d-inline-block ms-3"
                      >
                        Elimina
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>
                  Non hai ancora effettuato prenotazioni.
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
