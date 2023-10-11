import {
  SET_PRENOTAZIONI,
  FETCH_PRENOTAZIONI_ERROR,
  SET_BOOKING_DATA,
} from "../Redux/action";

const initialState = {
  cart: [],
  prenotazioni: [],
  error: null,
  bookingData: null,
  totalAmount: 0,
  currentUser: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
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
    case "SET_TOTAL_ORDER":
      return { ...state, totalAmount: action.payload };

    case "USER_LOGOUT":
      return {
        ...state,
        currentUser: null,
      };

    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
