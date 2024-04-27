import { useEffect } from "react";
import { useCartStepsUpdater } from "../../hooks/CartStepsProvider";
import { useUser } from "../../hooks/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Addresses() {
  const user = useUser();
  const navigate = useNavigate();
  const updateCartStep = useCartStepsUpdater();
  useEffect(() => {
    user
      ? updateCartStep("logged in")
      : navigate("/auth/signin", { state: { redirect: "/cart/address" } });
  }, []);

  const moveToNextStep = () => {
    updateCartStep("address");
    navigate("/cart/confirmation");
  };

  return (
    <div>
      <button onClick={moveToNextStep}>next step</button>
    </div>
  );
}
