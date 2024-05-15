// Import the functions you need from the SDKs you need
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDCM5ZBp7Sdpgvon_e_AlCXMn19HY6h2iI",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUGET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDINGID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

// connectAuthEmulator(auth, "http://127.0.0.1:9099");
export const productCollection = collection(db, "products");
export const usersCollection = collection(db, "users");
export const ordersCollection = collection(db, "orders");
export const quriesCollection = collection(db, "quries");
