import { doc, getDoc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function removeItemFromCart(userId, itemId) {
  const docRef = doc(usersCollection, userId);

  try {
    // Get the user document
    const userDocSnap = await getDoc(docRef);

    if (userDocSnap.exists) {
      // Extract the cart field (assuming it's an array)
      const cart = userDocSnap.data().cart;

      // Find the index of the item to remove
      const itemIndex = cart.findIndex((item) => item.itemId === itemId);

      // Check if item exists
      if (itemIndex !== -1) {
        // Remove the item at the specific index
        cart.splice(itemIndex, 1);

        // Update the user document with the modified cart
        await updateDoc(docRef, { cart });
        return "Item removed from cart successfully";
      } else {
        console.warn(`Item with ID ${itemId} not found in cart.`);
        return "Item not found in cart"; // Or handle differently
      }
    } else {
      console.warn(`User with ID ${userId} not found.`);
      return "User not found"; // Or handle differently
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error; // Re-throw for handling in calling code
  }
}
