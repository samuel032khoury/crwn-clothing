import {createSelector} from "reselect";

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