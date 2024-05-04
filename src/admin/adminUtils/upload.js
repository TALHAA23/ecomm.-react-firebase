import { addDoc } from "firebase/firestore";
import uploadProductImage from "./uploadProductImage";
import { productCollection } from "../../assets/firebase";
export default async function uploadProduct(productData) {
  try {
    if (!productData.img.name) throw new Error("Attach an image");
    productData.img = await uploadProductImage(productData.img);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  for (let [key, value] of Object.entries(productData)) {
    if (key == "img") continue;
    productData[key] = value.toLowerCase();
  }

  try {
    const docRef = await addDoc(productCollection, productData);
    console.log("Product added with ID:", docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error adding product to Firestore:", error);
    throw error; // Re-throw error for handling in the calling component
  }
}
