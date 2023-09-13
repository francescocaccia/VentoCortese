// Azioni (action.js)
export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: "REMOVE_FROM_CART", // Assicurati che il tipo corrisponda qui
    payload: itemId,
  };
};
