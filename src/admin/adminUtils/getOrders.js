import { getDocs, orderBy, query, where } from "firebase/firestore";
import { ordersCollection } from "../../assets/firebase";

export default async function getOrders() {
  const ordersQuery = query(
    ordersCollection,
    where("status", "!=", "delivered"),
    orderBy("placementDate", "desc")
  );

  const querySnapshot = await getDocs(ordersQuery);
  const orders = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return orders;
}
