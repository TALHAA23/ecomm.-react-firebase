import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { onAuthStateChanged, getIdTokenResult } from "@firebase/auth";
import { auth } from "../assets/firebase";
import ClientApp from "../components/ClientApp";
import AdminApp from "../admin/AdminApp";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();
export default function UserProvider({ children }) {
  const [UI, setUI] = useState(<ClientApp />);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);
  useEffect(() => {
    if (!user) {
      setUI(<ClientApp />);
      return;
    }
    getIdTokenResult(user).then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        setUI(<AdminApp />);
        navigate("/");
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
