import { call, put, takeLatest, all } from "redux-saga/effects";

import {
  firestore,
  convertColletionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import ShopActionsTypes from "./shop.types";
import {
  fetchCollectionsSuccess,
  fetchCollectionFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const collectionSnap = yield collectionRef.get();
    const collectionsMap = yield call(
      convertColletionsSnapshotToMap,
      collectionSnap
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }

}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionsTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas(){
  yield all([call(fetchCollectionsStart)])
}
