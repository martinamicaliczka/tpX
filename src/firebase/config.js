import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAh8pv1ioEy3vnvkhRq7hVV3o9zeEKHP-g",
  authDomain: "pi-rn-4e728.firebaseapp.com",
  projectId: "pi-rn-4e728",
  storageBucket: "pi-rn-4e728.firebasestorage.app",
  messagingSenderId: "897126391981",
  appId: "1:897126391981:web:f721023f34388649ac6624"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
