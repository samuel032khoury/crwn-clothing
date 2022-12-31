import {Link, useLocation, useNavigate} from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import './category-preview.styles.scss';

const CategoryPreview = ({title, products}) => {
  const firstFewProducts = products.length > 4 ? products.slice(0,4) : products;
  return (
    <div className={'category-preview-container'}>
      <h2>
        <Link className="title" to={title.toLowerCase()}>
          {`${title.slice(0, 1).toUpperCase()}${title.slice(1)}`}
        </Link>
      </h2>
      <div className="preview">
        {
          firstFewProducts.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
        }
      </div>
    </div>
  );
};

export default CategoryPreview;