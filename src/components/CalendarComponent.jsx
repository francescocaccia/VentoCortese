import React, { useEffect, useState } from "react";
import { DatePicker } from "react-rainbow-components";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CalendarComponent = ({ id }) => {
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const navigate = useNavigate();
  const handleArrivalDateChange = (date) => {
    setSelectedArrivalDate(date);
  };

  useEffect(() => {
    console.log(localStorage.getItem("userID"));
  }, []);

  const handleDepartureDateChange = (date) => {
    setSelectedDepartureDate(date);
  };

  const handleBooking = async () => {
    if (!localStorage.getItem("userID")) {
      alert("Per favore, registrati o esegui il login per prenotare.");
      navigate("/register");
      return;
    }

    if (!selectedArrivalDate || !selectedDepartureDate) {
      alert(
        "Seleziona le date di arrivo e partenza prima di procedere con la prenotazione."
      );
      return;
    }
    // Chiedi conferma all'utente
    const isConfirmed = window.confirm(
      "Sei sicuro di voler prenotare l'appartamento?"
    );
    if (!isConfirmed) {
      return; // Se l'utente non conferma, interrompe l'operazione.
    }

    const formatDate = (date) => {
      return `${("0" + date.getDate()).slice(-2)}/${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}/${date.getFullYear()}`;
    };

    const bookingData = {
      dataInizio: formatDate(selectedArrivalDate),
      dataFine: formatDate(selectedDepartureDate),
      idCliente: localStorage.getItem("userID"),
      idAppartamentino: parseInt(id),
      confermata: true,
      importoTotale: 200.0,
    };

    try {
      const response = await fetch("http://localhost:8080/prenotazioni/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Errore durante la prenotazione");
      }
      alert("Prenotazione effettuata con successo");
      console.log("Prenotazione effettuata con successo");
    } catch (error) {
      console.error("Errore durante la prenotazione:", error);
    }
  };
  return (
    <div className="container mt-5">
      <div>
        <label>Data di Arrivo</label>
        <DatePicker
          id="arrivalDatePicker"
          value={selectedArrivalDate}
          onChange={handleArrivalDateChange}
          label="Arrival Date"
          formatStyle="large"
        />
      </div>
      <div>
        <label>Data di Partenza</label>
        <DatePicker
          id="departureDatePicker"
          value={selectedDepartureDate}
          onChange={handleDepartureDateChange}
          label="Departure Date"
          formatStyle="large"
        />
      </div>
      <Button onClick={handleBooking}>Prenota</Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Data di Arrivo</th>
            <th>Data di Partenza</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectedArrivalDate && selectedArrivalDate.toDateString()}</td>
            <td>
              {selectedDepartureDate && selectedDepartureDate.toDateString()}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CalendarComponent;
