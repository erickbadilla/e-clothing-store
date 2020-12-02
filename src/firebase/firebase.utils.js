import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB7GLc7Ke49fqiKJoh31jYuUBa6Cs5Tx-Q",
    authDomain: "ecommerce-db-9bf76.firebaseapp.com",
    databaseURL: "https://ecommerce-db-9bf76.firebaseio.com",
    projectId: "ecommerce-db-9bf76",
    storageBucket: "ecommerce-db-9bf76.appspot.com",
    messagingSenderId: "491609189983",
    appId: "1:491609189983:web:b601a79f5d0a56197075ea",
    measurementId: "G-75Q1VKKD9K"
  };


  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters( { prompt: 'select_account' } );
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;


