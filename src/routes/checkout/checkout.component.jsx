import {useContext} from "react";
import {CartContext} from "../../context/cart.context";

import './checkout.styles.scss';
import CheckoutItem from "../../components/checkout-list/checkout-item/checkout-item.component";
import CheckoutListHeader from "../../components/checkout-list/checkout-list-header/checkout-list-header.component";
import CheckoutTotal from "../../components/checkout-list/checkout-total/checkout-total.component";

const Checkout = () => {
  const {cartItems, cartCount} = useContext(CartContext)
  return (
    <div className={'checkout-container'}>
      {cartCount ? <CheckoutListHeader/> : <h2>Cart is empty</h2>}
      {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
      {cartCount!==0 && <CheckoutTotal/>}
    </div>
  );
};

export default Checkout;