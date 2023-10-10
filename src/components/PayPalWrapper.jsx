import React from "react";
import PayPalButton from "./PayPalButton"; // Assicurati che il percorso sia corretto
import logo from "../logoColleponi.png";

const PayPalWrapper = ({ total, onSuccess }) => {
  return (
    <>
      <div className="paypal-wrapper">
        <img src={logo} alt="Logo" className="paypal-logo" />
        <p className="paypal-description">
          Completa il tuo acquisto in tutta sicurezza con PayPal.
        </p>
        <h5 className="mb-5">
          Il totale della prenotazione ammonta a: {total}
        </h5>
        <PayPalButton amount={total} onSuccess={onSuccess} />
      </div>
    </>
  );
};

export default PayPalWrapper;
