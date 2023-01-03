import {Fragment} from "react";
import {Outlet, Link} from "react-router-dom";
import {useSelector} from "react-redux";

import CartIcon from "../cart-widiget/cart-icon/cart-icon.component";
import CartDropdown from "../cart-widiget/cart-dropdown/cart-dropdown.component";

import {signOutUser} from "../../utils/firebase/firebase.utils";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";

import './navigation.styles.scss'
import {selectCartDropdownDisplay} from "../../store/slices/cart.slice";
import {selectUser} from "../../store/slices/user.slice";

const Navigation = () => {
  const {currentUser} = useSelector(selectUser)
  const cartDropDownDisplay = useSelector(selectCartDropdownDisplay)

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