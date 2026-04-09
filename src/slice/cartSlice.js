import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.cartItems.find(
        (i) => i._id === item._id
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      const existing = state.cartItems.find((i) => i._id === id);

      if (existing.qty > 1) {
        existing.qty -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i._id !== id
        );
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;