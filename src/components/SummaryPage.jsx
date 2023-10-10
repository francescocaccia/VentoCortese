import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTotalOrder } from "../Redux/action";
import logo from "../logoColleponi.png";

const SummaryPage = ({ externalConfirmBooking }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.bookingData);

  const daysBetween = (startDate, endDate) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (endDate - startDate) / millisecondsPerDay;
  };

  const totalDays =
    bookingData &&
    daysBetween(
      new Date(bookingData.dataInizio),
      new Date(bookingData.dataFine)
    );

  const totalCost =
    totalDays && bookingData.tariffa ? totalDays * bookingData.tariffa : 0;

  const displayDate = (date) => {
    return `${("0" + date.getDate()).slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;
  };

  const confirmBooking = (amount) => {
    // Usa 'amount' nella tua logica qui
    console.log("L'importo totale da pagare è:", amount);

    // Aggiungi questa linea per salvare il costo totale nello store Redux
    dispatch(setTotalOrder(amount));

    externalConfirmBooking(amount);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <img
          src={logo}
          alt="logo"
          width={110}
          height={110}
          className="img-with-shadow"
        />
      </div>
      <Container>
        <h2>Riepilogo Prenotazione</h2>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Data di inizio</td>
              <td>
                {bookingData
                  ? displayDate(new Date(bookingData.dataInizio))
                  : null}
              </td>
            </tr>
            <tr>
              <td>Data di fine</td>
              <td>
                {bookingData
                  ? displayDate(new Date(bookingData.dataFine))
                  : null}
              </td>
            </tr>
            <tr>
              <td>Giorni totali</td>
              <td>{totalDays}</td>
            </tr>
            <tr>
              <td>Costo totale</td>
              <td>€ {totalCost}</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Button
            className="btn btn-success"
            onClick={() => {
              if (
                window.confirm("Sei sicuro di voler procedere e prenotare?")
              ) {
                if (typeof confirmBooking === "function") {
                  confirmBooking(totalCost);
                  navigate("/checkout");
                } else {
                  console.error(
                    "confirmBooking non è una funzione o non è stata passata correttamente."
                  );
                }
              }
            }}
          >
            Procedi al Pagamento
          </Button>
        </div>
      </Container>
    </>
  );
};

export default SummaryPage;
