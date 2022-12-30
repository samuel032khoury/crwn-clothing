import {useContext} from "react";
import {CartContext} from "../../../context/cart.context";

import {ReactComponent as ShoppingIcon} from "../../../assets/shopping-bag.svg";

import './cart-icon.styles.scss'

const CartIcon = () => {
  const {cartDropDownDisplay, setCartDropDownDisplay, cartCount} = useContext(CartContext);
  const toggleCartDropDown = () => {setCartDropDownDisplay(!cartDropDownDisplay)}
  return (
    <div className={'cart-icon-container'} onClick={toggleCartDropDown}>
      <ShoppingIcon className={'shopping-icon'}/>
      <span className={'item-count'}>{cartCount}</span>
    </div>
  );
};

export default CartIcon;