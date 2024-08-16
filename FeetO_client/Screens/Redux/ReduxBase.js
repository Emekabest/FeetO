import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cart',

    initialState:{
        items:[]
    },
    reducers:{
        addItemToCart:(state, action)=>{
            state.items = action.payload
        },

        removeItemFromCart:(state, action)=>{
            state.items.filter(item => item.id !== action.payload)
        },
    }

})




export const {addItemToCart, removeItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;