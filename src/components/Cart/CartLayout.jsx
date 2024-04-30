import { Outlet } from "react-router-dom";
import CartSteps from "./CartSteps";
import CartStepsProvider from "../../hooks/CartStepsProvider";
import OrderDetailsProvider from "../../hooks/OrderDetailsProvider";
import { useUser } from "../../hooks/UserProvider";
import ProtectRoute from "../ProtectRoute";

export default function CartLayout() {
  const user = useUser();
  if (!user) return <ProtectRoute redirect="/cart" />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_300px] min-h-screen">
      <CartStepsProvider>
        <OrderDetailsProvider>
          <Outlet />
        </OrderDetailsProvider>
        <div className="relative h-full p-1">
          <CartSteps />
        </div>
      </CartStepsProvider>
    </div>
  );
}
