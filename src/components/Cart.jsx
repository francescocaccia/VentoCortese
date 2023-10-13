import { connect } from "react-redux";
import React, { useEffect } from "react";
import { removeFromCart, setTotalAmount } from "../Redux/action";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, removeItem, setTotalAmount }) => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durata dell'animazione in millisecondi
    });
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.prezzo, 0);
  };

  const handleCheckoutClick = () => {
    const totalAmount = getTotalPrice(); // Ottieni l'ammontare totale del carrello

    if (window.confirm("Sei sicuro di voler proseguire al pagamento?")) {
      setTotalAmount(totalAmount);

      navigate("/checkout");
    }
  };

  return (
    <div className="cart">
      <h2>Carrello</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Il carrello è vuoto...</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">Prezzo: {item.prezzo}€</p>

                <Button
                  className="remove-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Sei sicuro di voler rimuovere questo articolo dal carrello?"
                      )
                    ) {
                      removeItem(item.id); // Qui stai passando solo l'ID
                      console.log("ID dell'articolo da rimuovere:", item.id);
                    }
                  }}
                >
                  Rimuovi
                </Button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h4>Importo totale: {getTotalPrice()}€</h4>

            <Button className="checkout-button" onClick={handleCheckoutClick}>
              Vai al pagamento
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

// ... (tutto il resto del tuo codice rimane invariato)

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart, // Assumi che "cart" sia la chiave in cui mantieni il carrello nello stato Redux
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (itemId) => dispatch(removeFromCart(itemId)), // Passa solo l'ID dell'elemento

    setTotalAmount: (amount) => dispatch(setTotalAmount(amount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
