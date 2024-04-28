import { getDoc, doc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";
export default async function updateShippingAddress(userId, addressToUpdate) {
  try {
    const userDocRef = doc(usersCollection, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const shippingDetails = userData.shippingDetails;
      const indexToUpdate = shippingDetails.findIndex(
        (address) => address.shippingAddress === addressToUpdate.shippingAddress
      );

      if (indexToUpdate !== -1) {
        shippingDetails.forEach((address, index) => {
          address.inuse = index === indexToUpdate;
        });
        await updateDoc(userDocRef, { shippingDetails });
        console.log("Shipping address updated");
        return true; // Successfully updated
      } else {
        throw new Error("Address not found in shippingDetails.");
      }
    } else {
      throw new Error(`User document with ID ${userId} does not exist.`);
    }
  } catch (error) {
    console.error("Error toggling shipping address:", error.message);
    return false;
  }
}
