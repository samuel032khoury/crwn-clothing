import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

const INITIAL_STATE = {categories: []}

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  reducers: {
    setCategories: (state, action) => {state.categories = action.payload}
  },
});

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector([selectCategoriesReducer], (categoriesSlice) =>
  categoriesSlice.categories)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories => categories.reduce((acc, currentCategory) => {
    const {title, items} = currentCategory;
    acc[title.toLowerCase()] =
      items;
    return acc
  }, {})
);

export const {setCategories} = categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer