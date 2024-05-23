import { auth } from "../../assets/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return "logged-in successfully";
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(`"Error logging in user: ${errorMessage}`);
  }
}
