import { getDocs } from "firebase/firestore";
import { quriesCollection } from "../../assets/firebase";

export default async function getAllQueries() {
  const querySnapshot = await getDocs(quriesCollection);
  const quries = [];
  querySnapshot.forEach((doc) => {
    quries.push({ ...doc.data(), id: doc.id });
  });
  return quries;
}
