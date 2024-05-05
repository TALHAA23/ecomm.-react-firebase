import { doc, setDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function createUserDoc(userId, data) {
  const userDoc = doc(usersCollection, userId);
  await setDoc(userDoc, {
    accountInformation: data,
    cart: [],
    myOrders: [],
    shippingDetails: [],
    notifications: [],
  });
}
