import {createContext, useEffect, useState} from "react";

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

export const CartContext = createContext({
  cartDropDownDisplay: false,
  setCartDropDownDisplay: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decrementItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal:0,
})

export const CartProvider = ({children}) => {
  const [cartDropDownDisplay, setCartDropDownDisplay] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    setCartCount(cartItems.reduce((total, cartItem) => cartItem.quantity + total, 0));
  }, [cartItems])

  useEffect(() => {
    setCartTotal(cartItems.reduce((total, item) => total + (item.quantity * item.price), 0));
  }, [cartItems])

  const addItemToCart = (productToBeAdded) => {
    setCartItems(addCartItem(cartItems, productToBeAdded))
  }

  const decrementItemFromCart = (productToBeDecremented) => {
    setCartItems(decrementCartItem(cartItems, productToBeDecremented))
  }

  const removeItemFromCart = (productToBeRemoved) => {
    setCartItems(removeCarItem(cartItems, productToBeRemoved))
  }

  const value = {
    cartDropDownDisplay,
    setCartDropDownDisplay,
    cartItems,
    cartCount,
    setCartCount,
    cartTotal,
    setCartTotal,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}