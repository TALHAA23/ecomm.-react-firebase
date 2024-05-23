import { getDocs } from "firebase/firestore";
import { productCollection } from "../../assets/firebase";

export default async function getAllProducts() {
  try {
    const querySnapshot = await getDocs(productCollection);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Include other fields from the document
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}
