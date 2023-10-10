import React from "react";
import PayPalWrapper from "./PayPalWrapper";
import { useSelector } from "react-redux";

const PayPalCheckOutPage = () => {
  const totalOrder = useSelector((state) => state.totalAmount);

  const handleSuccess = (details) => {
    // Gestisci il successo del pagamento qui, ad esempio inviando i dettagli al tuo backend
    console.log(details);
  };

  return (
    <>
      <div className="mt-3">
        <PayPalWrapper total={totalOrder} onSuccess={handleSuccess} />
      </div>
    </>
  );
};

export default PayPalCheckOutPage;
