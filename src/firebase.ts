import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "persiangold-1fdf0.firebaseapp.com",
  projectId: "persiangold-1fdf0",
  storageBucket: "persiangold-1fdf0.appspot.com",
  messagingSenderId: "54607372635",
  appId: "1:54607372635:web:679a827c8ee357e4615ae",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);      
export const storage = getStorage(app);  