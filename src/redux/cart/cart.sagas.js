import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

import {
  clearCart,
  getCartFromFirebaseFailure,
  getCartFromFirebaseSuccess,
  updateCartInFirebaseFailure,
  updateCartInFirebaseSuccess,
} from "./cart.actions";

import UserActionsTypes from "../user/user.types";
import { CartActionsTypes } from "./cart.types";

import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";
import { getDoc, updateDoc } from "firebase/firestore";

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);

  if (!currentUser) {
    yield put(updateCartInFirebaseFailure("User is not authenticated"));
    return;
  }

  try {
    const userCartRef = yield getUserCartRef(currentUser.id);
    const cartItems = yield select(selectCartItems);
    yield updateDoc(userCartRef, { cartItems });
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
    const userCartSnapshot = yield getDoc(userCartRef);

    const userCart = userCartSnapshot.data().cartItems;

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
