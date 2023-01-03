import {createSelector} from "reselect";

const selectCategorySlice = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategorySlice],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector([selectCategories],
  categories => categories.reduce((acc, currentCategory) => {
    const {title, items} = currentCategory;
    acc[title.toLowerCase()] = items;
    return acc
  }, {})
);