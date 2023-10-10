// Azioni (action.js)
export const SET_PRENOTAZIONI = "SET_PRENOTAZIONI";
export const FETCH_PRENOTAZIONI_ERROR = "FETCH_PRENOTAZIONI_ERROR";
export const REMOVE_FROM_CART = "FETCH_PRENOTAZIONI_ERROR";
export const ADD_TO_CART = "FETCH_PRENOTAZIONI_ERROR";
export const SET_BOOKING_DATA = "SET_BOOKING_DATA";
export const SET_TOTAL_ORDER = "SET_TOTAL_ORDER";

export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: "REMOVE_FROM_CART",
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

export const setBookingData = (data) => ({
  type: SET_BOOKING_DATA,
  payload: data,
});
export const setTotalOrder = (amount) => ({
  type: SET_TOTAL_ORDER,
  payload: amount,
});
