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
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetchUserDetails();
    fetchUserBookings();
  }, []);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      handleLogout();
      return;
    }

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
      } else {
        const errorMessage = await response.text();
        throw new Error(
          `Errore nel recupero dei dettagli dell'utente: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Errore:", error);
      handleLogout();
    }
  };

  const fetchUserBookings = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      handleLogout();
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
        setBookings(data);
      } else {
        const errorMessage = await response.text();
        throw new Error(
          `Errore nel recupero delle prenotazioni: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Errore:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    // Qui puoi anche reindirizzare l'utente alla pagina di login o aggiornare lo stato Redux, se necessario.
    // ad esempio:
    // window.location.href = '/login';
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
              {bookings.map((booking) => (
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" defaultValue={userDetails.nome} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={userDetails.email} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salva Modifiche
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Container>
  );
};

export default UserProfile;
