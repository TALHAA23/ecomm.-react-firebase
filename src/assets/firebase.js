// Import the functions you need from the SDKs you need
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCwBTT4-HiNIssNpiMGfyAzmfn14umG90",
  authDomain: "grain-du-sud.firebaseapp.com",
  projectId: "grain-du-sud",
  storageBucket: "grain-du-sud.appspot.com",
  messagingSenderId: "689468662934",
  appId: "1:689468662934:web:355c8ce3f2411398994eb7"
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
