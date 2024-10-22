// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chirpflix.firebaseapp.com",
  projectId: "chirpflix",
  storageBucket: "chirpflix.appspot.com",
  messagingSenderId: "526576799667",
  appId: "1:526576799667:web:87936b0376b10de06185c6",
  measurementId: "G-4HHX0BYQM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app) 
const storage = getStorage(app)
// const storageRef = ref(storage);
export{app, auth, db, storage}