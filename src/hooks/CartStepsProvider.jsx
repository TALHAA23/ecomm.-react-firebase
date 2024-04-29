import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const CartStepContext = createContext();
export const useCartSteps = () => useContext(CartStepContext)[0];
export const useCartStepsUpdater = () => useContext(CartStepContext)[1];
export default function CartStepsProvider({ children }) {
  const user = useUser();
  const navigate = useNavigate();
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
  useEffect(() => {
    const stepsArray = Object.entries(steps);
    for (let [key, value] of stepsArray) {
      if (!value) {
        navigate(key == "cart" ? "/cart" : `/cart/${key}`);
        break;
      }
    }
  }, []);

  return (
    <CartStepContext.Provider value={[steps, updateStep]}>
      {children}
    </CartStepContext.Provider>
  );
}
