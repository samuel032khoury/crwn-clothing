import {addItemToCart, decrementItemFromCart, removeItemFromCart} from "../../../store/slices/cart.slice";

import './checkout-item.styles.scss';
import {useDispatch} from "react-redux";

const CheckoutItem = ({product}) => {
  const {name, imageUrl, price, quantity} = product
  const dispatch = useDispatch()
  const addItemHandler = () => dispatch(addItemToCart( product));
  const decrementItemHandler = () => dispatch(decrementItemFromCart(product));
  const removeItemHandler = () => dispatch(removeItemFromCart(product));
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