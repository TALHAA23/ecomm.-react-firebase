import { useRoutes } from "react-router-dom";
import Layout from "./AdminComponents/Layout";
import MainMenu from "./AdminComponents/MainMenu";
import ManageProductsLayout from "./AdminPages/ManageProductsLayout";
import Create from "./AdminComponents/ManageProducts/Create";
import UpdateAndDelete from "./AdminComponents/ManageProducts/UpdateAndDelete";
import ManageUsers from "./AdminPages/ManageUsers";
import ManageOrders from "./AdminPages/ManageOrders";
import Receipt from "../components/Receipt";
import ManageQuries from "./AdminPages/ManageQuries";

export default function AdminRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <MainMenu />,
        },
        {
          path: "receipt",
          element: <Receipt />,
        },
        {
          path: "manageProducts",
          element: <ManageProductsLayout />,
          children: [
            {
              index: true,
              element: <Create />,
            },
            {
              path: "updateordelete",
              element: <UpdateAndDelete />,
            },
          ],
        },
        {
          path: "manageusers",
          element: <ManageUsers />,
        },
        {
          path: "manageorders",
          element: <ManageOrders />,
        },
        {
          path: "managequries",
          element: <ManageQuries />,
        },
      ],
    },
  ]);
}
