import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice"
import CartSlice from "./slices/CartSlice"
import FavoritesSlice from "./slices/FavoritesSlice"

const store=configureStore({
    reducer:{
        auth:AuthSlice,
        cart:CartSlice,
        favorites:FavoritesSlice,
    }
})

export default store