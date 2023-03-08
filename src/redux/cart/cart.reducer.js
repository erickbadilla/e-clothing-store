import { CartActionsTypes } from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  isHidden: true,
  cartItems: [],
  error: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionsTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        isHidden: !state.isHidden,
      };

    case CartActionsTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActionsTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case CartActionsTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    case CartActionsTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case CartActionsTypes.GET_CART_FROM_FIREBASE_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };

    case CartActionsTypes.GET_CART_FROM_FIREBASE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
