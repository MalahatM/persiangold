import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

//  Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyCke-Ana7qsba829YNDQF4ikCTJt3FKjBc",
  authDomain: "persiangold-1fdf0.firebaseapp.com",
  projectId: "persiangold-1fdf0",
  storageBucket: "persiangold-1fdf0.firebasestorage.app",
  messagingSenderId: "546073376235",
  appId: "1:546073376235:web:679a827c8ee3537e4615ae",
  measurementId: "G-NR1C867G9P"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);