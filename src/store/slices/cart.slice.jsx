import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action)=>{
            return action.payload
        },
        deleteItem: (state, action)=>{
            const id = action.payload
            const filteredProducts = state.filter(movie => movie.id !== id)
            return filteredProducts
        },

       
}})

export const getCartItems = () => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then((res) => {dispatch(setCart(res.data.data.cart.products))})
        .finally(() => dispatch(setIsLoading(false)));
}

export const postCartItems = (cartItem) => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cartItem, getConfig())
        .then(() => dispatch(getCartItems()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

 /*export const patchCartItems = (units) => (dispatch) => {
    dispatch(setIsLoading(true));
      axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', units, getConfig())
         .then(() => dispatch(getCartItems()/))
         .finally(() => dispatch(setIsLoading(false)));
 }*/

export const deleteCartItem = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(() => {dispatch(deleteItem(id))})
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartCheckout = () => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
