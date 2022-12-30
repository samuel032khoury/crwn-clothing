import {useContext} from "react";
import {CartContext} from "../../../context/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem
  const {decrementItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext)
  const addItemHandler = () => addItemToCart(cartItem);
  const decrementItemHandler = () => decrementItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  return (
    <div className={'checkout-item-container'}>
      <div className="image-container">
        <img src={imageUrl} alt={name}/>
      </div>
      <span className={'name'}>{name}</span>
      <span className={'quantity'}>
      <div className={'arrow'} onClick={decrementItemHandler}> &#10094; </div>
      <span className="value">{quantity}</span>
      <div className={'arrow'} onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className={'price'}>{price}</span>
      <div className="remove-button" onClick={removeItemHandler}>&#10005;</div>
    </div>)
};

export default CheckoutItem;