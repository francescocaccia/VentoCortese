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
  const [editingBooking, setEditingBooking] = useState(null);

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

  const EditBookingModal = ({ show, booking, onHide }) => {
    const [formData, setFormData] = useState({
      idPrenotazione: booking ? booking.idPrenotazione : null,
      dataInizio: booking ? booking.dataInizio : "",
      dataFine: booking ? booking.dataFine : "",
      // ... (per gli altri campi)
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const fetchAppartamentoBookings = async (idAppartamentino) => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(
          `http://localhost:8080/prenotazioni/byAppartamentino/${idAppartamentino}`,
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
          return data;
        } else {
          const errorMessage = await response.text();
          console.error(
            `Errore nel recupero delle prenotazioni: ${errorMessage}`
          );
          return [];
        }
      } catch (error) {
        console.error("Errore nel recupero delle prenotazioni.");
        return [];
      }
    };

    const isDateOverlapping = (existingBookings, newStartDate, newEndDate) => {
      return existingBookings.some(
        (existingBooking) =>
          newStartDate <= existingBooking.dataFine &&
          newEndDate >= existingBooking.dataInizio
      );
    };

    const handleSubmit = async () => {
      const formatDateToCustom = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      };

      const token = localStorage.getItem("authToken");

      // Fetch existing bookings for the apartment
      const existingBookings = await fetchAppartamentoBookings(
        formData.idAppartamentino
      );

      // Check if the new booking dates are overlapping with any existing bookings
      if (
        isDateOverlapping(
          existingBookings,
          formatDateToCustom(formData.dataInizio),
          formatDateToCustom(formData.dataFine)
        )
      ) {
        window.alert("L'appartamento è già prenotato per queste date.");
        return;
      }

      const updatedBooking = {
        dataInizio: formatDateToCustom(formData.dataInizio),
        dataFine: formatDateToCustom(formData.dataFine),
        idCliente: userID,
        idAppartamentino: formData.idAppartamentino,
        confermata: formData.confermata,
        importoTotale: formData.importoTotale,
      };

      // Chiede conferma prima di effettuare la modifica
      if (!window.confirm("Sei sicuro di voler modificare la prenotazione?")) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/prenotazioni/${formData.idPrenotazione}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedBooking),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          fetchUserBookings(); // Ricarica le prenotazioni dopo averle aggiornate

          // Mostra un messaggio di successo
          window.alert("Prenotazione modificata con successo!");
        } else {
          const errorMessage = await response.text();
          setError(
            `Errore nell'aggiornamento della prenotazione: ${errorMessage}`
          );

          // Mostra un messaggio di errore
          window.alert("Errore durante la modifica della prenotazione.");
        }
      } catch (error) {
        setError("Errore durante l'aggiornamento della prenotazione.");
        window.alert("Errore durante la modifica della prenotazione.");
      } finally {
        onHide(); // Chiudi il modale sia che l'operazione vada a buon fine sia che ci siano errori
      }
    };

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Data inizio</Form.Label>
              <Form.Control
                type="date"
                name="dataInizio"
                value={formData.dataInizio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data fine</Form.Label>
              <Form.Control
                type="date"
                name="dataFine"
                value={formData.dataFine}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Aggiungi qui gli altri campi del form */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salva modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
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
                      <strong>Appartamento:</strong>{" "}
                      {booking.appartamentino.nome} (
                      {booking.appartamentino.descrizione})
                      <div>
                        <strong>Numero di Camere:</strong>{" "}
                        {booking.appartamentino.numeroDiCamere}
                      </div>
                      <div>
                        <strong>Capacità Massima:</strong>{" "}
                        {booking.appartamentino.capienzaMassima} persone
                      </div>
                      <div>
                        <strong>Tariffa:</strong>{" "}
                        {booking.appartamentino.tariffa}€ al giorno
                      </div>
                      <div>
                        <strong>Periodo di Prenotazione:</strong> Dal{" "}
                        {formatDate(booking.dataInizio)} al{" "}
                        {formatDate(booking.dataFine)}(
                        {daysBetween(booking.dataInizio, booking.dataFine)}{" "}
                        giorni)
                      </div>
                      <div>
                        <strong>Importo Totale:</strong> {booking.importoTotale}
                        €
                      </div>
                      <div className="booking-actions">
                        <Button
                          variant="outline-warning"
                          className="d-inline-block"
                          onClick={() => setEditingBooking(booking)}
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
        <EditBookingModal
          show={editingBooking !== null}
          booking={editingBooking}
          onHide={() => setEditingBooking(null)}
        />
      </Container>
    </>
  );
};

export default UserProfile;
