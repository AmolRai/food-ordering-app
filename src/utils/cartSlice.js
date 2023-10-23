import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  // Reducers have different types of actions like addItem, etc
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload); // add items
    },
    removeItems: (state, action) => {
      state.items.pop(); // removes items
    },
    clearCart: (state, action) => {
      state.items.length = 0; // []
    },
  },
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
