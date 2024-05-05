import { doc, getDoc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function deleteNotification(userId, notificationId) {
  const userDoc = doc(usersCollection, userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    const updatedNotifications = userData.notifications.filter(
      (notification, index) => index !== notificationId
    );
    await updateDoc(userDoc, {
      notifications: updatedNotifications,
    });
  }
}
