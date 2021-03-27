import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD5_C7BBsLGAykVy0L0W7EMBl_e1eknSRM",
    authDomain: "define-me-308905.firebaseapp.com",
    projectId: "define-me-308905",
    storageBucket: "define-me-308905.appspot.com",
    messagingSenderId: "449220911689",
    appId: "1:449220911689:web:0064e5aa9dca12515d9598",
    measurementId: "G-XRG74L5577"
  };

export const app = firebase.initializeApp(firebaseConfig);