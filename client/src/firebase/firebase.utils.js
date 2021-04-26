import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7GLc7Ke49fqiKJoh31jYuUBa6Cs5Tx-Q",
  authDomain: "ecommerce-db-9bf76.firebaseapp.com",
  databaseURL: "https://ecommerce-db-9bf76.firebaseio.com",
  projectId: "ecommerce-db-9bf76",
  storageBucket: "ecommerce-db-9bf76.appspot.com",
  messagingSenderId: "491609189983",
  appId: "1:491609189983:web:b601a79f5d0a56197075ea",
  measurementId: "G-75Q1VKKD9K",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, aditionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...aditionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const addColletionAndDocument = async (collectionKey, objectsToAdd) => {
  const colletionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach((object) => {
    const newDocumentRef = colletionRef.doc();
    batch.set(newDocumentRef, object);
  });

  return await batch.commit();
};

export const convertColletionsSnapshotToMap = (collections) => {
  const transformedColletions = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedColletions.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getUserCartRef = async (userId) => {
  const cartsRef = firestore.collection("carts").where("userId", "==", userId);
  const cartsSnapshot = await cartsRef.get();

  if (cartsSnapshot.empty) {
    const newCartDocRef = firestore.collection("carts").doc();
    newCartDocRef.set({ userId, cartItems: [] });
    return newCartDocRef;
  }
  return cartsSnapshot.docs[0].ref;
};

export const getCurrenctUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
