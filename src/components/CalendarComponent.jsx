import React, { useEffect, useState } from "react";
import { DatePicker } from "react-rainbow-components";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setBookingData } from "../Redux/action";
import { useDispatch } from "react-redux";

const CalendarComponent = ({ id, tariffa }) => {
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleArrivalDateChange = (date) => {
    setSelectedArrivalDate(date);
  };

  const handleDepartureDateChange = (date) => {
    setSelectedDepartureDate(date);
  };

  const getDaysDifference = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000; // ore*minuti*secondi*millisecondi
    return Math.ceil((end.getTime() - start.getTime()) / oneDay);
  };

  const handleBooking = () => {
    if (!localStorage.getItem("userID")) {
      alert("Per favore, registrati o esegui il login per prenotare.");
      navigate("/login");
      return;
    }

    if (!selectedArrivalDate || !selectedDepartureDate) {
      alert(
        "Seleziona le date di arrivo e partenza prima di procedere con la prenotazione."
      );
      return;
    }

    const isConfirmed = window.confirm(
      "Sei sicuro di voler procedere con la prenotazione?"
    );
    if (!isConfirmed) {
      return;
    }

    const formatDate = (date) => {
      return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
        -2
      )}-${("0" + date.getDate()).slice(-2)}`;
    };

    const totalDays = getDaysDifference(
      selectedArrivalDate,
      selectedDepartureDate
    );

    const bookingData = {
      dataInizio: formatDate(selectedArrivalDate),
      dataFine: formatDate(selectedDepartureDate),
      idCliente: localStorage.getItem("userID"),
      idAppartamentino: parseInt(id),
      confermata: false,
      giorniTotali: totalDays,
      tariffa: tariffa,
    };

    dispatch(setBookingData(bookingData));
    navigate("/summaryPage");
  };

  useEffect(() => {
    console.log(localStorage.getItem("userID"));
  }, []);

  return (
    <Container>
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
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Button className="btn btn-success" onClick={handleBooking}>
            Prenota
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CalendarComponent;

{
  /* <Table striped bordered hover className="mt-4">
<thead>
  <tr>
    <th>Data di Arrivo</th>
    <th>Data di Partenza</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
      {selectedArrivalDate && selectedArrivalDate.toDateString()}
    </td>
    <td>
      {selectedDepartureDate && selectedDepartureDate.toDateString()}
    </td>
  </tr>
</tbody>
</Table> */
}
