import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs0LLPBXiZZl0bfvu7QPqek9acHdP9qtY",
  authDomain: "nasa-challenge-8c074.firebaseapp.com",
  projectId: "nasa-challenge-8c074",
  storageBucket: "nasa-challenge-8c074.appspot.com",
  messagingSenderId: "429507089244",
  appId: "1:429507089244:web:9aa491ed60d757d3806799",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
