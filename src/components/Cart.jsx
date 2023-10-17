import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setTotalAmount } from "../Redux/action";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log("Contenuto del carrello:", cartItems);

  cartItems.forEach((item) => {
    if (
      !item.id ||
      !item.imageUrl ||
      !item.name ||
      !item.description ||
      !item.prezzo ||
      !("quantity" in item)
    ) {
      console.error("Oggetto nel carrello :", item);
    }
  });

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.prezzo || 0;
      const itemQuantity = item.quantity || 1;
      return total + itemPrice * itemQuantity;
    }, 0);
  };

  const handleCheckoutClick = () => {
    const totalAmount = getTotalPrice();
    if (window.confirm("Sei sicuro di voler proseguire al pagamento?")) {
      dispatch(setTotalAmount(totalAmount));
      navigate("/checkout");
    }
  };

  return (
    <>
      <div className="cart">
        <GiShoppingCart className="mt-3 fs-1" />
        <h2>Carrello</h2>
        {cartItems && cartItems.length === 0 ? (
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
                  <div className="item-controls">
                    <Button
                      className="remove-button btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Sei sicuro di voler rimuovere questo articolo dal carrello?"
                          )
                        ) {
                          handleRemoveFromCart(item.id);
                          console.log(`Rimosso ${item.name}`);
                        }
                      }}
                    >
                      <AiFillDelete />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h4>Importo totale: {getTotalPrice()}€</h4>
              <Button className="checkout-button" onClick={handleCheckoutClick}>
                <BsCashCoin className="me-2" />
                Vai al pagamento
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
