import { doc, getDoc } from "firebase/firestore";
import { productCollection, usersCollection } from "../../assets/firebase";

// Function to get cart items for a user
export const getCartItems = async (userId) => {
  try {
    // Get the user document
    const userDoc = await getDoc(doc(usersCollection, userId));
    if (!userDoc.exists()) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    // Extract the cart field (array of references/IDs)
    const cartItems = userDoc.data().cart;

    // Fetch documents for each item in the cart
    const cartDocs = await Promise.all(
      cartItems.map(async (itemId) => {
        const itemDoc = await getDoc(doc(productCollection, itemId));
        if (itemDoc.exists()) {
          return { ...itemDoc.data(), id: itemDoc.id };
        } else {
          console.warn(`Item with ID ${itemId} not found.`);
          return null;
        }
      })
    );

    // Filter out any null values (items not found)
    const validCartDocs = cartDocs.filter((doc) => doc !== null);
    return validCartDocs;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};
