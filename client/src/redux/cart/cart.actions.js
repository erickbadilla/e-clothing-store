import { CartActionsTypes } from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionsTypes.TOGGLE_CART_HIDDEN,
});

export const addItemToCart = (item) => ({
  type: CartActionsTypes.ADD_ITEM,
  payload: item,
});

export const removeItemFromCart = (item) => ({
  type: CartActionsTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CartActionsTypes.CLEAR_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionsTypes.CLEAR_CART,
});
