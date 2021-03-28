import firebase from 'firebase/app'
import "firebase/storage"
const GOOGLE_APPLICATION_CREDENTIALS = process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: GOOGLE_APPLICATION_CREDENTIALS,
  authDomain: "define-me-308905.firebaseapp.com",
  projectId: "define-me-308905",
  storageBucket: "define-me-308905.appspot.com",
  messagingSenderId: "449220911689",
  appId: "1:449220911689:web:0064e5aa9dca12515d9598",
  measurementId: "G-XRG74L5577"
};

export const app = firebase.initializeApp(firebaseConfig);