import ShopActionsTypes from "./shop.types";

import {
  firestore,
  convertColletionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = (collectionsMap) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionFailure = (error) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
  payload: error,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const colletionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart());

    colletionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertColletionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionFailure(error.message)));
  };
};
