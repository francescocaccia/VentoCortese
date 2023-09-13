const initialState = {
  cart: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      // Utilizza l'ID o un altro identificatore univoco per rimuovere l'elemento
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return state;
  }
};

export default Reducer;
