import { auth } from "../../assets/firebase";

export default async function signOutUser() {
  try {
    await auth.signOut();
  } catch (err) {
    return err;
  }
}
