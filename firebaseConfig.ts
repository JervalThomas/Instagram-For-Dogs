// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDte4NdeiNRExoaTmoGF4VQqiGsnNUv1PU",
  authDomain: "instagramfordogs-fd321.firebaseapp.com",
  projectId: "instagramfordogs-fd321",
  storageBucket: "instagramfordogs-fd321.appspot.com",
  messagingSenderId: "545742480882",
  appId: "1:545742480882:web:7599d25576702061d9f76b",
  measurementId: "G-NMZNPGV2Q8"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
