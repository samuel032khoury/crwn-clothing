import {Fragment} from "react";

import CategoryPreview from "../category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/slices/categories.slice";

const AllCategories = () => {

  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(title => (
          <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
        ))
      }
    </Fragment>
  );
};

export default AllCategories;