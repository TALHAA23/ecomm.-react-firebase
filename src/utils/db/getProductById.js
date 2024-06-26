import { doc, getDoc } from "firebase/firestore";
import { productCollection } from "../../assets/firebase";

export default async function getProductById(productId) {
  const docRef = doc(productCollection, productId);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) throw new Error("Product not exists");
  return { ...docSnapshot.data(), id: docSnapshot.id };
}
