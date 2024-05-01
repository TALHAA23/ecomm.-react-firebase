import { addDoc, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ordersCollection, usersCollection } from "../../assets/firebase";
import clearCartAfterOrder from "./clearCartAfterOrder";

export default async function placeOrder(userId, orderDetails) {
  orderDetails = {
    ...orderDetails,
    orderBy: userId,
    placementDate: new Date(),
    status: "placed",
  };
  try {
    // Add the order document to the collection
    const orderDocRef = await addDoc(ordersCollection, orderDetails);

    // Get the generated order ID
    const orderId = orderDocRef.id;

    // Update user document with order reference
    await updateDoc(doc(usersCollection, userId), {
      myOrders: arrayUnion(orderId), // Add order ID to user's myOrders array
    });

    console.log("Order created successfully:", orderId);
    clearCartAfterOrder(userId, orderDetails);
    return orderId; // Return the order ID
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Re-throw for handling in calling code
  }
}
