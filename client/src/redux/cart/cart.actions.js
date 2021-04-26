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

export const updateCartInFirebaseStart = () => ({
  type: CartActionsTypes.UPDATE_CART_IN_FIREBASE_START,
});

export const updateCartInFirebaseSuccess = () => ({
  type: CartActionsTypes.UPDATE_CART_IN_FIREBASE_SUCCESS,
});

export const updateCartInFirebaseFailure = (error) => ({
  type: CartActionsTypes.UPDATE_CART_IN_FIREBASE_FAILURE,
  payload: error,
});

export const getCartFromFirebaseStart = () => ({
  type: CartActionsTypes.GET_CART_FROM_FIREBASE_START,
});

export const getCartFromFirebaseSuccess = (cartItems) => ({
  type: CartActionsTypes.GET_CART_FROM_FIREBASE_SUCCESS,
  payload: cartItems,
});

export const getCartFromFirebaseFailure = (error) => ({
  type: CartActionsTypes.GET_CART_FROM_FIREBASE_FAILURE,
  payload: error,
});
