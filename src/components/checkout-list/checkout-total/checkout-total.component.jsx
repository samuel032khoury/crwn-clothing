import {useContext} from "react";
import {CartContext} from "../../../context/cart.context";

import './checkout-total.styles.scss';

const CheckoutTotal = () => {
  const {cartTotal} = useContext(CartContext)
  return (
    <div className={'checkout-total'}>
      Total: ${cartTotal}
    </div>
  );
};

export default CheckoutTotal;