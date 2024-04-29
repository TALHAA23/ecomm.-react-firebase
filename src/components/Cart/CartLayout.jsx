import { Outlet } from "react-router-dom";
import CartSteps from "./CartSteps";
import CartStepsProvider from "../../hooks/CartStepsProvider";
import OrderDetailsProvider from "../../hooks/OrderDetailsProvider";

export default function CartLayout() {
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
