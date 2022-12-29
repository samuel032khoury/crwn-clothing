import {createContext, useState} from "react";

export const CartContext = createContext({
  cartDropDownDisplay: false,
  setCartDropDownDisplay: () => {},
})

export const CartProvider = ({children}) => {
  const [cartDropDownDisplay, setCartDropDownDisplay] = useState(false);
  const value = {cartDropDownDisplay, setCartDropDownDisplay};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}