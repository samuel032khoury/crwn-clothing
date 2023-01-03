import {CART_ACTION_TYPES} from "./cart.action-types";

const addCartItem = (cartItems, productToBeAdded) => {
  const newCartItems = [...cartItems];
  // find if cartItems contains product
  const itemIndex = newCartItems.findIndex((item) => item.id === productToBeAdded.id);
  // if found, increase quantity
  if (itemIndex > -1) {
    newCartItems[itemIndex].quantity += 1;
  } else {
    newCartItems.push({...productToBeAdded, quantity: 1});
  }
  return newCartItems;
}

const decrementCartItem = (cartItems, productToBeAdded) => {
  const newCartItems = [...cartItems];
  // find if cartItems contains product
  const itemIndex = newCartItems.findIndex((item) => item.id === productToBeAdded.id);
  // decrease quantity if quantity is bigger than 1
  newCartItems[itemIndex].quantity -= 1;
  if (newCartItems[itemIndex].quantity === 0) {
    newCartItems.splice(itemIndex, 1);
  }
  return newCartItems;
}

const removeCarItem = (cartItems, productToBeAdded) => {
  const newCartItems = [...cartItems];
  // find if cartItems contains product
  const itemIndex = newCartItems.findIndex((item) => item.id === productToBeAdded.id);
  // decrease quantity if quantity is bigger than 1
  newCartItems.splice(itemIndex, 1);
  return newCartItems;
}

const updateCartItems = (newCartItems) => {
  return {
    type: CART_ACTION_TYPES.UPDATE_CART_ITEMS,
    payload: newCartItems
  }
}

export const addItemToCart = (cartItems, productToBeAdded) => (
  updateCartItems(addCartItem(cartItems, productToBeAdded))
)

export const decrementItemFromCart = (cartItems, productToBeDecremented) => (
  updateCartItems(decrementCartItem(cartItems, productToBeDecremented))
)

export const removeItemFromCart = (cartItems, productToBeRemoved) => (
  updateCartItems(removeCarItem(cartItems, productToBeRemoved))
)

export const toggleCartDropdownDisplay = (cartDropdownIsDisplaying) => {
  return {
    type: CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN_DISPLAY,
    payload: !cartDropdownIsDisplaying
  }
}