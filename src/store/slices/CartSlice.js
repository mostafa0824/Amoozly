import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  items: savedCart,
  totalPrice: savedCart.reduce(
    (total, sum) => total + sum.price * sum.cartQuantity,
    0
  ),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const item = action.payload;
      const find = state.items.find((pr) => pr?.documentId === item?.documentId);

      find
        ? find.cartQuantity++
        : state.items.push({ ...item, cartQuantity: 1 });

      state.totalPrice += item.price;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeCart: (state, action) => {
      const id = action.payload;
      const find = state.items.find((pr) => pr?.documentId === id);

      if (find) {
        state.totalPrice -= find.price;
        find.cartQuantity--;
      }
      if (find.cartQuantity === 0) {
       state.items= state.items.filter((pr) => pr.documentId !== id);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
