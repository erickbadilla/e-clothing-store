import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  writeBatch,
  query,
  where,
  setDoc,
  limit,
  getDocs,
} from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);

  const userRef = doc(firestore, "users", userAuth.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(collectionKey);

  const batch = writeBatch(firestore);

  objectsToAdd.forEach((object) => {
    const newDocumentRef = doc(collectionRef);
    batch.set(newDocumentRef, object);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getUserCartRef = async (userId) => {
  const cartsRef = query(
    collection(firestore, "carts"),
    where("userId", "==", userId),
    limit(1)
  );
  const cartSnapshot = await getDocs(cartsRef);

  if (cartSnapshot.empty) {
    const newCartDocRef = doc(collection("carts"));
    await setDoc(newCartDocRef, { userId, cartItems: [] });
    return newCartDocRef;
  }

  return cartSnapshot.docs.at(0).ref;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default app;
