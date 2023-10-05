import React from "react";
import PayPalWrapper from "./PayPalWrapper";

const PayPalCheckOutPage = () => {
  const totalOrder = 50.0; // Il totale del tuo ordine

  const handleSuccess = (details) => {
    // Gestisci il successo del pagamento qui, ad esempio inviando i dettagli al tuo backend
    console.log(details);
  };

  return (
    <div>
      {/* // Altri componenti o elementi del tuo checkout ... */}
      <PayPalWrapper total={totalOrder} onSuccess={handleSuccess} />
    </div>
  );
};

export default PayPalCheckOutPage;
