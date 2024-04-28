import { getDoc, doc } from "firebase/firestore";
import { usersCollection } from "../../assets/firebase";

export default async function getUserField(userId, fieldName) {
  if (!fieldName)
    throw new Error("all arguments are required, missing fieldName");
  // Get the user document
  const userDocRef = doc(usersCollection, userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    // Extract the specified field
    const userData = userDocSnapshot.data();
    const fieldValue = userData[fieldName];
    return fieldValue;
  } else {
    throw new Error(`User document with ID ${userId} does not exist.`);
  }
}
