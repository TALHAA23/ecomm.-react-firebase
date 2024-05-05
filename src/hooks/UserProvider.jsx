import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { onAuthStateChanged, getIdTokenResult } from "@firebase/auth";
import { auth } from "../assets/firebase";
import ClientApp from "../components/ClientApp";
import AdminApp from "../admin/AdminApp";
const UserContext = createContext();
export default function UserProvider({ children }) {
  // const [UI, setUI] = useState(<ClientApp />);
  const [UI, setUI] = useState(<ClientApp />);
  const [user, setUser] = useState(null);
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [authenticationLoading, setAuthenticationLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);
  useEffect(() => {
    if (!user) return;
    getIdTokenResult(user).then((idTokenResult) => {
      // Confirm the user is assigned the "client" role
      if (!!idTokenResult.claims.admin) {
        setUI(<AdminApp />);
      } else {
        setUI(<ClientApp />);
      }
    });
  }, [user]);

  //   useEffect(() => {
  //     if (!user) {
  //       setIsAuthenticated(false);
  //       setAuthenticationLoading(false);
  //       return;
  //     }

  //     (async () => {
  //       await getIdTokenResult(user)
  //         .then((idTokenResult) => {
  //           if (idTokenResult.claims) {
  //             setIsAuthenticated(true);
  //           } else {
  //             setIsAuthenticated(false);
  //           }
  //           setAuthenticationLoading(false);
  //         })
  //         .catch((error) => {
  //           console.error("Error verifying ID token:", error);
  //           setIsAuthenticated(false);
  //           setAuthenticationLoading(false);
  //         });
  //     })();
  //   }, [user]);

  return (
    <UserContext.Provider value={{ user, UI }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)?.user;
export const useUI = () => useContext(UserContext)?.UI;
