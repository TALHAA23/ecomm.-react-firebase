import { doc, getDoc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

// Assuming you have already initialized your Firestore database

export default async function toggleProductsReadyState(userId, productIds) {
  try {
    // Get the user document
    const userDocRef = doc(usersCollection, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Retrieve the cart
      const cart = userDocSnapshot.data().cart;

      // Update the ready state for each product
      const updatedCart = [...cart];
      productIds.forEach((productId) => {
        const productIndex = updatedCart.findIndex(
          (item) => item.itemId === productId
        );
        if (productIndex !== -1) {
          updatedCart[productIndex].ready = !updatedCart[productIndex].ready;
          console.log(`Product with ID ${productId} ready state toggled.`);
        } else {
          console.log(`Product with ID ${productId} not found in the cart.`);
        }
      });

      // Update the user document
      await updateDoc(userDocRef, { cart: updatedCart });
    } else {
      console.log(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    console.error("Error toggling product ready state:", error);
  }
}
