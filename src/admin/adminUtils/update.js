import { updateDoc, doc } from "firebase/firestore";
import uploadProductImage from "./uploadProductImage";
import { productCollection } from "../../assets/firebase";

export async function updateProduct(productId, data) {
  if ("img" in data) data.img = await uploadProductImage(data.image);
  try {
    const productRef = doc(productCollection, productId);
    await updateDoc(productRef, data);
    console.log(`Product with ID: ${productId} updated successfully.`);
    return `${productId} updated`;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Re-throw the error for handling in the calling function (optional)
  }
}
