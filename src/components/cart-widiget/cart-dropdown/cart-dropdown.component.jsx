import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import CartItem from "../cart-item/cart-item.component";
import Button from "../../button/button.component";
import {selectCartItems} from "../../../store/cart/cart.selector";

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()
  return (
    <div className={'cart-dropdown-container'}>
      {cartItems.length ?
        <div className="cart-items">
        {cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)}
      </div> :
        <h4 style={{textAlign: 'center', marginTop:'120px'}}>YOUR CART IS EMPTY</h4>
      }
      <Button onClickHandler={() => {navigate('/checkout')}} disablePredicate={cartItems.length===0}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;