import { doc, getDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function getNotifications(userId) {
  const userDoc = doc(usersCollection, userId);

  // Get the user document
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();

    // Add an 'id' field to each notification object
    const notifications = userData.notifications.map((notification, index) => ({
      ...notification,
      id: index,
    }));

    return notifications;
  }
}
