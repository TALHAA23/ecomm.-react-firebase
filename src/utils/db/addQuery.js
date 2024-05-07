import { addDoc } from "firebase/firestore";
import { quriesCollection } from "../../assets/firebase";

export default async function addQuery(queryData) {
  const docRef = await addDoc(quriesCollection, queryData);
  return docRef.id;
}
