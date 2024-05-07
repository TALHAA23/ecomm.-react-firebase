import { doc, deleteDoc } from "firebase/firestore";
import { quriesCollection } from "../../assets/firebase";

export default async function deleteQueryById(id) {
  const queryRef = doc(quriesCollection, id);
  await deleteDoc(queryRef);
}
