import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  // When creating slice it will be multiple "reducers" function
  // Reducers have different types of actions like addItem, etc
  reducers: {
    addItems: (state, action) => {
      // Vanilla(older) Redux => DON'T MUTATE THE STATE and return the new state
      // const newState = [...state];
      // newState.items.push(action.payload);
      // return newState

      // Redux Toolkit
      // We HAVE to MUTATE THE STATE
      // Redux uses immer behind the scenes
      state.items.push(action.payload); // add items
    },
    removeItems: (state, action) => {
      // Remove the specified index items
      state.items.splice(action.payload, 1);
    },

    // original state = {items: ["pizza"]}
    clearCart: (state, action) => {
      // []
      state.items.length = 0;

      // Either do the above thing which mutate the original state
      // this new array will be replace inside the original state = { items: [] }
      // return { items: [] };
    },
  },
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
