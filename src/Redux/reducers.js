import { SET_PRENOTAZIONI, FETCH_PRENOTAZIONI_ERROR } from "../Redux/action";

const initialState = {
  cart: [],
  prenotazioni: [],
  error: null,
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
    default:
      return state;
  }
};

export default Reducer;
