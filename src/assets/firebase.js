// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCM5ZBp7Sdpgvon_e_AlCXMn19HY6h2iI",
  authDomain: "e-commerce-7bd3f.firebaseapp.com",
  projectId: "e-commerce-7bd3f",
  storageBucket: "e-commerce-7bd3f.appspot.com",
  messagingSenderId: "695233770176",
  appId: "1:695233770176:web:0e426d88ba6e1e0cddb325",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const productCollection = collection(db, "products");
export const usersCollection = collection(db, "users");
export const auth = getAuth(app);
