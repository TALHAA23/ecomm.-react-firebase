import { createContext, useContext, useState } from "react";

const OrderDetailsContext = createContext();

export const useOrderDetails = () => useContext(OrderDetailsContext)[0];
export const useOrderDetailsUpdater = () => useContext(OrderDetailsContext)[1];

export default function OrderDetailsProvider({ children }) {
  const [details, setDetails] = useState({
    checkoutItems: [],
    orderTotal: 0,
    shippingDetails: {},
  });
  const updateOrderDetails = (key, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  return (
    <OrderDetailsContext.Provider value={[details, updateOrderDetails]}>
      {children}
    </OrderDetailsContext.Provider>
  );
}
