import {useSelector} from "react-redux";

import CheckoutItem from "../../components/checkout-list/checkout-item/checkout-item.component";
import CheckoutListHeader from "../../components/checkout-list/checkout-list-header/checkout-list-header.component";
import CheckoutTotal from "../../components/checkout-list/checkout-total/checkout-total.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import {selectCartCount, selectCartItems} from "../../store/slices/cart.slice";

import './checkout.styles.scss';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  return (
    <div className={'checkout-container'}>
      {cartCount ? <CheckoutListHeader/> : <h2>Cart is empty</h2>}
      {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} product={cartItem}/>)}
      {cartCount!==0 && <CheckoutTotal/>}
      {cartCount!==0 && <PaymentForm/>}
    </div>
  );
};

export default Checkout;