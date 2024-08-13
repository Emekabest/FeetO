import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './ReduxBase'


const store = configureStore({
    reducer: {
        cart: cartReducer,
      },

})

export default store;