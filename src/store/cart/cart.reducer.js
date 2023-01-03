import {CART_ACTION_TYPES} from "./cart.action-types";

const INITIAL_STATE = {
  cartDropDownDisplay: false,
  cartItems: [],
}

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const {type, payload} = action
  switch (type) {
    case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      }
    case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN_DISPLAY:
      return {
        ...state,
        cartDropDownDisplay:payload,
      }
    default:
      return state
  }
}