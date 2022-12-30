import {Fragment, useContext} from "react";
import {Outlet, Link} from "react-router-dom";

import CartIcon from "../cart-widiget/cart-icon/cart-icon.component";
import CartDropdown from "../cart-widiget/cart-dropdown/cart-dropdown.component";

import {UserContext} from "../../context/user.context";
import {CartContext} from "../../context/cart.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";

import './navigation.styles.scss'

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {cartDropDownDisplay} = useContext(CartContext)

  return (
    <Fragment>
      <div className={'navigation'}>
        <Link className={'logo-container'} to={'/'}>
          <CrownLogo className={'logo '}/>
        </Link>
        <div className={'nav-links-container'}>
          <Link className={'nav-link'} to={'/shop'}>
            SHOP
          </Link>
          {
            currentUser ? (
              <span className={'nav-link'} onClick={() => signOutUser()}>SIGN OUT</span>
            ) : (
              <Link className={'nav-link'} to={'/login'}>
                SIGN IN
              </Link>
            )
          }
          <CartIcon className="nav-link"/>
        </div>
      </div>
      {cartDropDownDisplay && <CartDropdown/>}
      <Outlet/>
    </Fragment>
  );
};

export default Navigation;