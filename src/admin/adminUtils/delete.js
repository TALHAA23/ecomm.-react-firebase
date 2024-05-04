import { deleteDoc, doc } from "firebase/firestore";
import { productCollection } from "../../assets/firebase";

export async function deleteProduct(productId) {
  console.log(productId);
  try {
    const productRef = doc(productCollection, productId);
    await deleteDoc(productRef);
    console.log(`Product with ID: ${productId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Re-throw the error for handling in the calling function (optional)
  }
}
