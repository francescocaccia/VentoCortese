export const SET_PRENOTAZIONI = "SET_PRENOTAZIONI";
export const FETCH_PRENOTAZIONI_ERROR = "FETCH_PRENOTAZIONI_ERROR";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const SET_BOOKING_DATA = "SET_BOOKING_DATA";
export const SET_TOTAL_ORDER = "SET_TOTAL_ORDER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";
export const SET_TOTAL_AMOUNT = " SET_TOTAL_AMOUNT";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
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

export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
};

export const setTotalAmount = (amount) => ({
  type: "SET_TOTAL_AMOUNT",
  payload: amount,
});
