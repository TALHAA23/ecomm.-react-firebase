import { auth } from "../../assets/firebase";
export default async function signOutUser() {
  try {
    auth.signOut();
    window.location.reload()
  } catch (err) {
    return err;
  }
}
