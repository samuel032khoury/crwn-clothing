import {Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {getQueryDocumentsData} from "../../utils/firebase/firebase.utils";
import {setCategories} from "../../store/slices/categories.slice";

import AllCategories from "../../components/shop-all-categories/all-shop-categories.component";
import ShopCategory from "../../components/shop-category/shop-category.component";

import './shop.styles.scss'

const Shop = () => {
  const dispatch = useDispatch()

  // update categories
  useEffect(() => {
    const updateCategoriesMap = async () => {
      const categories = await getQueryDocumentsData('categories');
      dispatch(setCategories(categories));
    }
    updateCategoriesMap().then(null);
  }, [dispatch]);

 return (
  <Routes>
   <Route index element={<AllCategories/>}/>
   <Route path={":category"} element={<ShopCategory/>}/>
  </Routes>
 );
};

export default Shop;