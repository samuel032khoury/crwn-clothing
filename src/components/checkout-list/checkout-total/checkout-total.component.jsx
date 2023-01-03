import {useSelector} from "react-redux";
import {selectCartTotal} from "../../../store/cart/cart.selector";

import './checkout-total.styles.scss';

const CheckoutTotal = () => {
  const cartTotal = useSelector(selectCartTotal)
  return (
    <div className={'checkout-total'}>
      Total: ${cartTotal}
    </div>
  );
};

export default CheckoutTotal;