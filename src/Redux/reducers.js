import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_PRENOTAZIONI,
  FETCH_PRENOTAZIONI_ERROR,
  SET_BOOKING_DATA,
  SET_TOTAL_ORDER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_CURRENT_USER,
  USER_LOGOUT,
  SET_TOTAL_AMOUNT,
} from "../Redux/action";

const initialState = {
  cart: [],
  totalAmount: 0,
  prenotazioni: [],
  error: null,
  bookingData: null,
  currentUser: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      console.log("Stato corrente:", state.cart);
      console.log("ID da rimuovere:", action.payload);
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      console.log("Stato aggiornato:", updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };

    case SET_PRENOTAZIONI:
      return { ...state, prenotazioni: action.payload };
    case FETCH_PRENOTAZIONI_ERROR:
      return { ...state, error: action.payload };
    case SET_BOOKING_DATA:
      return { ...state, bookingData: action.payload };
    case SET_TOTAL_ORDER:
      return { ...state, totalAmount: action.payload };

    case USER_LOGOUT:
      return {
        ...state,
        currentUser: null,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case "SET_TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
