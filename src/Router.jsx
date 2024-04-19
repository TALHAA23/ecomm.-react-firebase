import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <h1>Hello</h1>,
        },
        {
          path: "accuiel",
          element: <h1>Hello</h1>,
        },
        {
          path: "services",
          element: <h1>Hello</h1>,
        },
        {
          path: "nos nutritions",
          element: <h1>Hello</h1>,
        },
        {
          path: "nos Poussins",
          element: <h1>Hello</h1>,
        },
        {
          path: "nos poulets",
          element: <h1>Hello</h1>,
        },
        {
          path: "contact",
          element: <h1>Hello</h1>,
        },
      ],
    },
  ]);
}
