import { doc, getDoc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function clearCartAfterOrder(userId, orderDetails) {
  try {
    // Extract the IDs of the checkout items
    const checkoutItemIds = orderDetails.checkoutItems.map((item) => item.id);

    // Get the current cart items
    const userDoc = await getDoc(doc(usersCollection, userId));
    const currentCartItems = userDoc.data().cart;

    // Filter out the items that are in the checkoutItems
    const updatedCartItems = currentCartItems.filter(
      (cartItem) => !checkoutItemIds.includes(cartItem.itemId)
    );

    // Update the user's cart
    await updateDoc(doc(usersCollection, userId), {
      cart: updatedCartItems,
    });

    console.log("Cart cleared successfully after order placement");
  } catch (error) {
    console.error("Error clearing cart after order:", error);
    throw error; // Re-throw for handling in calling code
  }
}
