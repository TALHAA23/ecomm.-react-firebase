import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../assets/firebase";
import createUserDoc from "../db/createUserDoc";

export default async function createUser(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: username,
    });

    const { displayName, uid, metadata } = user;

    await createUserDoc(user.uid, {
      displayName,
      uid,
      metadata: metadata.creationTime,
      email: user.email,
    });

    return "User created successfully";
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(`Error creating user: ${errorMessage}`);
  }
}
