import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

const INITIAL_STATE = {
  cartDropDownDisplay: false, cartItems: [],
}

const addItemToCartReducer = (state, action) => {
  const {cartItems} = state;
  const productToBeAdded = action.payload;
  const itemIndex = cartItems.findIndex((item) => item.id === productToBeAdded.id);
  if (itemIndex > -1) {
    cartItems[itemIndex].quantity += 1;
  } else {
    cartItems.push({...productToBeAdded, quantity: 1});
  }
}

const decrementItemFromCartReducer = (state, action) => {
  const {cartItems} = state;
  const productToBeDecremented = action.payload;
  const itemIndex = cartItems.findIndex((item) => item.id === productToBeDecremented.id);
  console.log(itemIndex);
  cartItems[itemIndex].quantity -= 1;
  if (cartItems[itemIndex].quantity === 0) {
    cartItems.splice(itemIndex, 1);
  }
}

const removeItemFromCartReducer = (state, action) => {
  const {cartItems} = state;
  const productToBeRemoved = action.payload;
  const itemIndex = cartItems.findIndex((item) => item.id === productToBeRemoved.id);
  cartItems.splice(itemIndex, 1);
}

const cartSlice = createSlice({
  name: 'cart', initialState: INITIAL_STATE, reducers: {
    setCartDropdownDisplay: (state, action) => {state.cartDropDownDisplay = action.payload},
    addItemToCart: addItemToCartReducer,
    decrementItemFromCart: decrementItemFromCartReducer,
    removeItemFromCart: removeItemFromCartReducer,
  }
})
export const cartReducer = cartSlice.reducer
export const {setCartDropdownDisplay, addItemToCart, decrementItemFromCart, removeItemFromCart} = cartSlice.actions


const selectCartSlice = state => state.cart

const selectCartItems = createSelector([selectCartSlice], cart => cart['cartItems'])

const selectCartDropdownDisplay = createSelector([selectCartSlice], cart => cart['cartDropDownDisplay'])

const selectCartCount = createSelector([selectCartItems], cartItems => cartItems.reduce((total, cartItem) => cartItem.quantity + total, 0))

const selectCartTotal = createSelector([selectCartItems], cartItems => cartItems.reduce((total, item) => total + (item.quantity * item.price), 0))

export {selectCartItems, selectCartDropdownDisplay, selectCartCount, selectCartTotal}
