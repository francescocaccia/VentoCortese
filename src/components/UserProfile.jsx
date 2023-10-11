import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/action";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userID");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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
        console.log("Dati utente:", data); // Aggiungi questo console.log
        setUserDetails(data); // Memorizza i dettagli dell'utente nello stato
        dispatch(setCurrentUser(data.nome));
      } else {
        const errorMessage = await response.text();
        throw new Error(
          `Errore nel recupero dei dettagli dell'utente: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Errore:", error);
      setError("Errore nel recupero dei dettagli dell'utente.");
    }
  };

  const fetchUserBookings = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError(
        "Token non trovato. Si prega di effettuare nuovamente l'accesso."
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/prenotazioni/${userID}`,
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

        if (typeof data === "object" && data.idPrenotazione) {
          setBookings([data]); // Metti l'oggetto in un array
        } else {
          console.error("Errore: la risposta dal server non è un array", data);
        }
      } else {
        const errorMessage = await response.text();
        throw new Error(
          `Errore nel recupero delle prenotazioni: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Errore:", error);
      setError("Errore nel recupero delle prenotazioni.");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Sei sicuro di voler effettuare il logout?"
    );
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userID");
      setError("Logout effettuato");
      dispatch({ type: "USER_LOGOUT" });
      window.confirm("Logout effettuato con successo");
      navigate("/");
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    setError("Logout effettuato");
    setShowLogoutConfirm(false); // Chiudi il modal di conferma
  };

  return (
    <Container className="mt-5 profile-container">
      <Row>
        <Col md={4}>
          <Card className="profile-card">
            <Image
              src="https://r.search.yahoo.com/_ylt=AwrijHw40x9lOH0b0YcdDQx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQ5NTUyYzE0YzUwNDNjZjZlNzhhYTI2ODE3NjJhOWRkBGdwb3MDNARpdANiaW5n/RV=2/RE=1696613305/RO=11/RU=https%3a%2f%2fwww.pngitem.com%2fmiddle%2fixoTwm_circled-user-male-type-user-colorful-icon-png%2f/RK=2/RS=3Pt1Ew.fyh0jko4qlayMpy.eFdA-"
              roundedCircle
              className="profile-avatar"
            />
            <Card.Body>
              <Card.Title className="profile-name">
                {userDetails.nome}
              </Card.Title>
              <Card.Text className="profile-email">
                {userDetails.email}
              </Card.Text>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Modifica Profilo
              </Button>
              <Button variant="danger" onClick={handleLogout} className="mt-2">
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="bookings-card">
            <Card.Header className="bookings-header">
              Le tue prenotazioni
            </Card.Header>
            <ListGroup variant="flush">
              {Array.isArray(bookings) &&
                bookings.map((booking) => (
                  <ListGroup.Item key={booking.id} className="booking-item">
                    {booking.descrizione} - Dal {booking.dataInizio} al{" "}
                    {booking.dataFine}(
                    {daysBetween(booking.dataInizio, booking.dataFine)} giorni)
                    <div className="booking-actions">
                      <Button variant="outline-warning">Modifica</Button>
                      <Button variant="outline-danger">Elimina</Button>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
