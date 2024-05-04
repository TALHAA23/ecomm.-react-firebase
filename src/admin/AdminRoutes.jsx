import { useRoutes } from "react-router-dom";
import Layout from "./AdminComponents/Layout";
import MainMenu from "./AdminComponents/MainMenu";
import ManageProductsLayout from "./AdminPages/ManageProductsLayout";
import Create from "./AdminComponents/ManageProducts/Create";
import Delete from "./AdminComponents/ManageProducts/Delete";

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
          path: "manageProducts",
          element: <ManageProductsLayout />,
          children: [
            {
              index: true,
              element: <Create />,
            },
            {
              path: "delete",
              element: <Delete />,
            },
          ],
        },
      ],
    },
  ]);
}
