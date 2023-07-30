import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState= {
   totalItems: localStorage.getItem("totalItems") ?
   JSON.parse(localStorage.getItem("totalItems")):
   0
}

const cartSlice = createSlice({
    name:"cart",
    initialState : initialState,
    reducers:{
        addToCart(state, value){
            state.user.push(value.payload);
            toast.success("Added To Cart")
        },
        removeFromCart(state, value){
            state.user = state.user.filter((item)=> item.id!==value.payload)
            toast.error("Removed To Cart")
        }
    }
})


export const {setUser} = cartSlice.actions;

export default cartSlice.reducer;