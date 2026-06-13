import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCF0QGtLRJM7-g7E8HK5KUdZM_cqX_NChA",
  authDomain: "sai-novelty.firebaseapp.com",
  projectId: "sai-novelty",
  storageBucket: "sai-novelty.firebasestorage.app",
  messagingSenderId: "79933399842",
  appId: "1:79933399842:web:143860787ae0a805e07b7b"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);