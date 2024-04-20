import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import Services from "./pages/Services";
import OurNutrition from "./pages/OurNutrition";
import OurChicks from "./pages/OurChicks";
import OurChickens from "./pages/OurChickens";
import Contact from "./pages/Contact";

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
          element: <Welcome />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "nos nutritions",
          element: <OurNutrition />,
        },
        {
          path: "nos Poussins",
          element: <OurChicks />,
        },
        {
          path: "nos poulets",
          element: <OurChickens />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ]);
}
