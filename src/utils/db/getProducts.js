import { productCollection } from "../../assets/firebase";
import { getDocs, query, orderBy, startAfter, limit } from "firebase/firestore";

export default async function getProducts(lastDoc) {
  let q = lastDoc
    ? query(productCollection, orderBy("title"), startAfter(lastDoc), limit(9))
    : query(productCollection, orderBy("title"), limit(9));
  const querySnapshot = await getDocs(q);
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
  const lastDocRef = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { lastDocRef, products };
}
