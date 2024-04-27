// import { doc, getDoc } from "firebase/firestore";
// import { productCollection, usersCollection } from "../../assets/firebase";

// // Function to get cart items for a user
// export const getCartItems = async (userId) => {
//   try {
//     // Get the user document
//     const userDoc = await getDoc(doc(usersCollection, userId));
//     if (!userDoc.exists()) {
//       throw new Error(`User with ID ${userId} not found.`);
//     }

//     // Extract the cart field (array of references/IDs)
//     const cartItems = userDoc.data().cart;

//     // Fetch documents for each item in the cart
//     const cartDocs = await Promise.all(
//       cartItems.map(async (item) => {
//         const itemDoc = await getDoc(doc(productCollection, item.itemId));
//         if (itemDoc.exists()) {
//           return { ...itemDoc.data(), id: itemDoc.id, ready: item.ready };
//         } else {
//           console.warn(`Item with ID ${item.itemId} not found.`);
//           return null;
//         }
//       })
//     );

//     // Filter out any null values (items not found)
//     const validCartDocs = cartDocs.filter((doc) => doc !== null);
//     return validCartDocs;
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     throw error;
//   }
// };

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { productCollection, usersCollection } from "../../assets/firebase";

// Function to get cart items for a user in real time
export default async function getCartItems(userId, callback) {
  try {
    // Get the user document reference
    const userDocRef = doc(usersCollection, userId);

    // Listen for changes to the user document
    const unsubscribe = onSnapshot(userDocRef, async (userDoc) => {
      if (userDoc.exists()) {
        // Extract the cart field (array of references/IDs)
        const cartItems = userDoc.data().cart;

        // Fetch documents for each item in the cart
        const cartDocs = await Promise.all(
          cartItems.map(async (item) => {
            const itemDoc = await getDoc(doc(productCollection, item.itemId));
            if (itemDoc.exists()) {
              return { ...itemDoc.data(), id: itemDoc.id, ready: item.ready };
            } else {
              console.warn(`Item with ID ${item.itemId} not found.`);
              return null;
            }
          })
        );
        // Filter out any null values (items not found)
        const validCartDocs = cartDocs.filter((doc) => doc !== null);
        callback(validCartDocs); // Invoke the callback with updated data
      } else {
        console.warn(`User with ID ${userId} not found.`);
      }
    });

    // Return the unsubscribe function to stop listening when needed
    return () => unsubscribe();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
}
