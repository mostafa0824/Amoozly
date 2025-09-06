import { createSlice } from "@reduxjs/toolkit";

// دریافت علاقه‌مندی‌ها از localStorage
const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  items: getFavorites(),
};

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addfavorites: (state, action) => {
      const item = action.payload;
      const find= state.items.find((pr) => pr?.documentId === item?.documentId
      );
      
      if (!find) {
        state.items.push({ ...item, favoritesQuantity: 1 });
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFavorites: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((pr) => pr.documentId !== id);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearfavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addfavorites, removeFavorites, clearfavorites } =FavoritesSlice.actions;
export default FavoritesSlice.reducer;