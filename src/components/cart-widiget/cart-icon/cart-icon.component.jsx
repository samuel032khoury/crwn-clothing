import {useContext} from "react";
import {CartContext} from "../../../context/cart.context";

import {ReactComponent as ShoppingIcon} from "../../../assets/shopping-bag.svg";

import './cart-icon.styles.scss'

const CartIcon = () => {
  const {toggleCartDropDownDisplay, cartCount} = useContext(CartContext);
  return (
    <div className={'cart-icon-container'} onClick={toggleCartDropDownDisplay}>
      <ShoppingIcon className={'shopping-icon'}/>
      <span className={'item-count'}>{cartCount}</span>
    </div>
  );
};

export default CartIcon;