import {useState, useEffect, Fragment} from "react";
import {useParams} from "react-router-dom";

import './shop-category.styles.scss';
import ProductCard from "../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/categories.selector";

const ShopCategory = () => {
  const {category} = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category])
  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{`All ${category.slice(0, 1).toUpperCase()}${category.slice(1)}`}</h2>
      <div className={'category-container'}>
        {products && products.map(product => <ProductCard key={product.id} product={product}/>)}
      </div>
    </Fragment>
  );
};

export default ShopCategory;