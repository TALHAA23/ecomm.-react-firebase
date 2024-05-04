import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { onAuthStateChanged, getIdTokenResult } from "@firebase/auth";
import { auth } from "../assets/firebase";
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export default function UserProvider({ children }) {
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
      console.log(idTokenResult);
      if (!!idTokenResult.claims.admin) {
        console.log("User is a client");
      } else {
        console.log("User is not a client");
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

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
