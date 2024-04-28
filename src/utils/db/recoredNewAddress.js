import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function recordNewAddress(userId, data) {
  const userDocRef = doc(usersCollection, userId);
  const response = await updateDoc(userDocRef, {
    shippingDetails: arrayUnion(data),
  });
  return response;
}
