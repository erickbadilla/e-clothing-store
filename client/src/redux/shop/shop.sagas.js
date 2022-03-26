import {all, call, put, takeLatest} from "redux-saga/effects";

import {convertCollectionsSnapshotToMap, firestore,} from "../../firebase/firebase.utils";

import ShopActionsTypes from "./shop.types";
import {fetchCollectionFailure, fetchCollectionsSuccess,} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = yield firestore.collection("collections");
    const collectionSnap = yield collectionRef.get();
    const collectionsMap = yield call(
        convertCollectionsSnapshotToMap,
        collectionSnap
    );
    console.log("entre");
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }
}

export function* onFetchCollectionsStart() {
  yield takeLatest(
      ShopActionsTypes.FETCH_COLLECTIONS_START,
      fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(onFetchCollectionsStart)]);
}
