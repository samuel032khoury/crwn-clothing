import {createContext, useReducer} from "react";

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

const INITIAL_STATE = {
  cartDropDownDisplay: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CartContext = createContext({
  cartDropDownDisplay: false,
  cartItems: [],
  addItemToCart: () => {},
  decrementItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

const cartReducer = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case "UPDATE_CART_ITEMS":
      return {
        ...state,
        ...payload,
      }
    case "TOGGLE_CART_DROPDOWN_DISPLAY":
      return {
        ...state,
        cartDropDownDisplay:payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const {cartDropDownDisplay, cartItems, cartCount, cartTotal} = state

  const toggleCartDropDownDisplay = () => {
    dispatch({
      type: "TOGGLE_CART_DROPDOWN_DISPLAY",
      payload: !cartDropDownDisplay
    })
  }

  const updateCartItemsReducer = (newCartItems) => {
    dispatch({
      type: "UPDATE_CART_ITEMS",
      payload: {
        cartItems: newCartItems,
        cartCount: newCartItems.reduce((total, cartItem) => cartItem.quantity + total, 0),
        cartTotal: newCartItems.reduce((total, item) => total + (item.quantity * item.price), 0)
      },
    })
  }

  const addItemToCart = (productToBeAdded) => {
    updateCartItemsReducer(addCartItem(cartItems, productToBeAdded))
  }

  const decrementItemFromCart = (productToBeDecremented) => {
    updateCartItemsReducer(decrementCartItem(cartItems, productToBeDecremented))
  }

  const removeItemFromCart = (productToBeRemoved) => {
    updateCartItemsReducer(removeCarItem(cartItems, productToBeRemoved))
  }

  const value = {
    cartDropDownDisplay,
    toggleCartDropDownDisplay,
    cartItems,
    cartCount,
    cartTotal,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}