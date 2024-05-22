import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { onAuthStateChanged, getIdTokenResult } from "@firebase/auth";
import { auth } from "../assets/firebase";
import ClientApp from "../components/ClientApp";
import AdminApp from "../admin/AdminApp";
const UserContext = createContext();
export default function UserProvider({ children }) {
  const [UI, setUI] = useState(<AdminApp />);
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);
  useEffect(() => {
    if (!user) return;
    getIdTokenResult(user).then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        setUI(<AdminApp />);
      } else {
        setUI(<ClientApp />);
      }
    });
  }, [user]);
  return (
    <UserContext.Provider value={{ user, UI }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)?.user;
export const useUI = () => useContext(UserContext)?.UI;
