// Azioni (action.js)
export const SET_PRENOTAZIONI = "SET_PRENOTAZIONI";
export const FETCH_PRENOTAZIONI_ERROR = "FETCH_PRENOTAZIONI_ERROR";

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

export const setPrenotazioni = (data) => ({
  type: "SET_PRENOTAZIONI",
  payload: data,
});

export const fetchPrenotazioniError = (error) => ({
  type: "FETCH_PRENOTAZIONI_ERROR",
  payload: error,
});
