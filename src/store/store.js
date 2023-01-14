import {logger} from "redux-logger";
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import {userReducer} from "./slices/user.slice";
import {categoriesReducer} from "./slices/categories.slice";
import {cartReducer} from "./slices/cart.slice";

const rootReducer = combineReducers({
  user:userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
})

const persistConfig = {
  key:'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const storeOptions = {reducer:persistedReducer}

if(process.env.NODE_ENV !== 'production') {
  storeOptions.middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);
}

export const store = configureStore(storeOptions)

export const persistor = persistStore(store)
