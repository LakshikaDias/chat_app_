import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZJxC7qUVmiay37qKqn_biJVjMZmijI50",
  authDomain: "chatwithreaact.firebaseapp.com",
  projectId: "chatwithreaact",
  storageBucket: "chatwithreaact.appspot.com",
  messagingSenderId: "1074396116525",
  appId: "1:1074396116525:web:a0df53ef9daf500e1eeaa4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
