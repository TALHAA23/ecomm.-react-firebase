import { doc, updateDoc } from "firebase/firestore";
import { ordersCollection } from "../../assets/firebase";

export default async function updateOrderStatus(docId, newStatus) {
  const orderDoc = doc(ordersCollection, docId);

  await updateDoc(orderDoc, {
    status: newStatus,
  });
}
