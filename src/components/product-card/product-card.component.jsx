import {useDispatch} from "react-redux";

import Button from "../button/button.component";
import {addItemToCart} from "../../store/slices/cart.slice";

import './product-card.styles.scss'

const ProductCard = ({product}) => {
  const {name, price, imageUrl} = product
  const dispatch = useDispatch()
  const addProductToCart = () => dispatch(addItemToCart(product))
  return (
    <div className={'product-card-container'}>
      <img src={imageUrl} alt={name}/>
      <div className={'footer'}>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button extraClassName={'inverted'} onClickHandler={addProductToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;