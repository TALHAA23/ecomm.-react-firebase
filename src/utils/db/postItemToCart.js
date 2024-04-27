import { usersCollection } from "../../assets/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default async function postItemToCart(userId, itemId) {
  const docRef = doc(usersCollection, userId);
  await updateDoc(docRef, {
    cart: arrayUnion({ itemId, ready: true }),
  });
  return { message: "Item added to cart successfully" };
}
