import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function removeItemFromCart(userId, itemId) {
  const docRef = doc(usersCollection, userId);
  await updateDoc(docRef, {
    cart: arrayRemove(itemId),
  });
  return "Item removed from cart successfully";
}
