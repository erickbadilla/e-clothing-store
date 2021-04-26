import { all, call, takeLatest, put, select } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

import {
  clearCart,
  updateCartInFirebaseSuccess,
  updateCartInFirebaseFailure,
  getCartFromFirebaseSuccess,
  getCartFromFirebaseFailure,
} from "./cart.actions";

import UserActionsTypes from "../user/user.types";
import { CartActionsTypes } from "./cart.types";

import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "../cart/cart.selectors";

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);

  if (!currentUser) {
    yield put(updateCartInFirebaseFailure("User is not authenticated"));
    return;
  }

  try {
    const userCartRef = yield getUserCartRef(currentUser.id);
    const cartItems = yield select(selectCartItems);
    yield userCartRef.update({ cartItems });
    yield put(updateCartInFirebaseSuccess());
  } catch (error) {
    yield put(updateCartInFirebaseFailure(error.message));
  }
}

export function* onCartUpdate() {
  yield takeLatest(
    [
      CartActionsTypes.ADD_ITEM,
      CartActionsTypes.REMOVE_ITEM,
      CartActionsTypes.CLEAR_ITEM,
    ],
    updateCartInFirebase
  );
}

export function* getCartFromFirebase({ payload: currentUser }) {
  try {
    const userCartRef = yield getUserCartRef(currentUser.id);
    const userCartSnaphot = yield userCartRef.get();

    const userCart = userCartSnaphot.data().cartItems;
    
    yield put(getCartFromFirebaseSuccess(userCart));
  } catch (error) {
    yield put(getCartFromFirebaseFailure(error.message));
  }
}

export function* onSignIn() {
  yield takeLatest(UserActionsTypes.SIGN_IN_SUCCESS, getCartFromFirebase);
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOut() {
  yield takeLatest(UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignIn), call(onSignOut), call(onCartUpdate)]);
}
