import {ReactComponent as ShoppingIcon} from "../../../assets/shopping-bag.svg";
import {toggleCartDropdownDisplay} from "../../../store/cart/cart.action";

import './cart-icon.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectCartDropdownDisplay} from "../../../store/cart/cart.selector";

const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  const cartDropdownIsDisplaying = useSelector(selectCartDropdownDisplay)
  const dispatch = useDispatch()
  const cartIconClickHandler = () => dispatch(toggleCartDropdownDisplay(cartDropdownIsDisplaying))
  return (
    <div className={'cart-icon-container'} onClick={cartIconClickHandler}>
      <ShoppingIcon className={'shopping-icon'}/>
      <span className={'item-count'}>{cartCount}</span>
    </div>
  );
};

export default CartIcon;