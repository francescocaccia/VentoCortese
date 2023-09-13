// store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // Crea il tuo reducer

const store = createStore(rootReducer);

export default store;
