import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import 'firebase/compat/firestore'



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
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
