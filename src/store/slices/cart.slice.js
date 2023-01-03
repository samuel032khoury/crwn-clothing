import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

const addCartItem = (cartItems, productToBeAdded) => {
  const newCartItems = JSON.parse(JSON.stringify(cartItems));
  const itemIndex = newCartItems.findIndex((item) => item.id === productToBeAdded.id);
  if (itemIndex > -1) {
    newCartItems[itemIndex].quantity += 1;
  } else {
    newCartItems.push({...productToBeAdded, quantity: 1});
  }
  return newCartItems;
}

const decrementCartItem = (cartItems, productToBeAdded) => {
  const newCartItems = JSON.parse(JSON.stringify(cartItems));
  const itemIndex = newCartItems.findIndex((item) => item.id === productToBeAdded.id);
  newCartItems[itemIndex].quantity -= 1;
  if (newCartItems[itemIndex].quantity === 0) {
    newCartItems.splice(itemIndex, 1);
  }
  return newCartItems;
}

const removeCarItem = (cartItems, productToBeAdded) => {
  const newCartItems = JSON.parse(JSON.stringify(cartItems));
  // find if cartItems contains product
  const itemIndex = newCartItems.findIndex((item) => item.id === productToBeAdded.id);
  // decrease quantity if quantity is bigger than 1
  newCartItems.splice(itemIndex, 1);
  return newCartItems;
}

const INITIAL_STATE = {
  cartDropDownDisplay: false,
  cartItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState:INITIAL_STATE,
  reducers: {
    toggleCartDropdownDisplay: (state, action) => {state.cartDropDownDisplay = !action.payload},
    updateCartItems: (state, action) => {state.cartItems = action.payload}
  }
})

export const cartReducer = cartSlice.reducer
export const {toggleCartDropdownDisplay, updateCartItems} = cartSlice.actions

export const addItemToCart = (cartItems, productToBeAdded) => (
  updateCartItems(addCartItem(cartItems, productToBeAdded))
)

export const decrementItemFromCart = (cartItems, productToBeDecremented) => (
  updateCartItems(decrementCartItem(cartItems, productToBeDecremented))
)

export const removeItemFromCart = (cartItems, productToBeRemoved) => (
  updateCartItems(removeCarItem(cartItems, productToBeRemoved))
)

const selectCartSlice = state => state.cart

export const selectCartItems = createSelector(
  [selectCartSlice],
  cart => cart.cartItems
)

export const selectCartDropdownDisplay = createSelector(
  [selectCartSlice],
  cart => cart.cartDropDownDisplay
)

export const selectCartCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((total, cartItem) => cartItem.quantity + total, 0)
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((total, item) => total + (item.quantity * item.price), 0)
)