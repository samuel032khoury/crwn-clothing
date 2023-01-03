import {logger} from "redux-logger";
import {configureStore} from "@reduxjs/toolkit";

import {userReducer} from "./slices/user.slice";
import {categoriesReducer} from "./slices/categories.slice";
import {cartReducer} from "./slices/cart.slice";

const reducer = {
  user:userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
}

const storeOptions = {reducer}

if(process.env.NODE_ENV !== 'production') {
  storeOptions.middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);
}

export const store = configureStore(storeOptions)
