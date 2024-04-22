import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../assets/firebase";

export default async function createUser(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    updateProfile(user, {
      displayName: username,
    });

    return "User created successfully";
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(`Error creating user: ${errorMessage}`);
  }
}
