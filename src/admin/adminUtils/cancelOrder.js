import {
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ordersCollection, usersCollection } from "../../assets/firebase";

export default async function cancelOrder(orderId, orderBy) {
  const orderDoc = doc(ordersCollection, orderId);
  const userDoc = doc(usersCollection, orderBy);

  // Delete the order document
  await deleteDoc(orderDoc);

  // Get the user document
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();

    // Filter out the deleted order from the 'myOrders' array
    const updatedOrders = userData.myOrders.filter(
      (order) => order !== orderId
    );

    // Update the user document
    await updateDoc(userDoc, {
      myOrders: updatedOrders,
      notifications: arrayUnion({
        message: `Your order with order number "${orderId}" is cancelled.`,
        isReaded: false,
      }),
    });
  }
}
