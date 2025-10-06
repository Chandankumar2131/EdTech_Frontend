import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};
const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.totalItems = value.payload;
        },
        // add to cart
        addToCart(state, value) {
            state.totalItems += 1;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Course added to cart");
        },
        // remove from cart
        removeFromCart(state, value) {
            state.totalItems -= 1;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Course removed from cart");  
    },
        // reset cart
        resetCart(state) {
            state.totalItems = 0;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            // toast.success("Cart reset successfully");   

    },          
},
});
export const { setTotalItems,addToCart,removeFromCart,resetCart } = cartSlice.actions;
export default cartSlice.reducer;