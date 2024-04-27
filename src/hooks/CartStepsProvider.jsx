import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";

const CartStepContext = createContext();
export const useCartSteps = () => useContext(CartStepContext)[0];
export const useCartStepsUpdater = () => useContext(CartStepContext)[1];
export default function CartStepsProvider({ children }) {
  const user = useUser();
  const [steps, setSteps] = useState({
    cart: false,
    ["logged in"]: false,
    address: false,
    confirmation: false,
    end: false,
  });

  const updateStep = (step) => {
    setSteps((prevSteps) => ({
      ...prevSteps,

      [step]: true,
    }));
  };

  return (
    <CartStepContext.Provider value={[steps, updateStep]}>
      {children}
    </CartStepContext.Provider>
  );
}
