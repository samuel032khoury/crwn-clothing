import {Routes, Route} from "react-router-dom";

import './shop.styles.scss'
import AllCategories from "./all-categories/all-categories.component";
import ShopCategory from "./shop-category/shop-category.component";

const Shop = () => {
 return (
  <Routes>
   <Route index element={<AllCategories/>}/>
   <Route path={":category"} element={<ShopCategory/>}/>
  </Routes>
 );
};

export default Shop;