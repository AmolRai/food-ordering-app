import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// configureStore allows us to create a store for our app
const appStore = configureStore({
  // Below is the reducer for our big appStore and it contains
  // small-small reducer for each reducer like cartReducer, userReducer, etc
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
