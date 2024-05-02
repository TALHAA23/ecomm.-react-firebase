import { doc, getDoc } from "firebase/firestore";
import { ordersCollection, usersCollection } from "../../assets/firebase";

export default async function getMyOrders(userId) {
  try {
    const userDoc = await getDoc(doc(usersCollection, userId));
    const userData = userDoc.data();
    const userOrderIds = userData?.myOrders;
    if (!userOrderIds) throw new Error("You have no order");
    let orders = [];
    for (let orderId of userOrderIds) {
      const orderDoc = await getDoc(doc(ordersCollection, orderId));
      const orderData = orderDoc.data();
      orders.push(orderData);
    }
    return orders; // Return the orders
  } catch (error) {
    throw error; // Re-throw for handling in calling code
  }
}
