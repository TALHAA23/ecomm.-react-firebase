import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import signOutUser from "./utils/authentication/signout";
import { lazy } from "react";
import MySuspense from "./components/MySuspense";

const Welcome = lazy(() => import("./pages/Welcome"));
const Services = lazy(() => import("./pages/Services"));
const OurNutrition = lazy(() => import("./pages/OurNutrition"));
const OurChicks = lazy(() => import("./pages/OurChicks"));
const OurChickens = lazy(() => import("./pages/OurChickens"));
const Contact = lazy(() => import("./pages/Contact"));
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
          element: <MySuspense children={<Welcome />} />,
        },
        {
          path: "services",
          element: <MySuspense children={<Services />} />,
        },
        {
          path: "nosnutritions",
          element: <MySuspense children={<OurNutrition />} />,
        },
        {
          path: "nosPoussins",
          element: <MySuspense children={<OurChicks />} />,
        },
        {
          path: "nospoulets",
          element: <MySuspense children={<OurChickens />} />,
        },
        {
          path: "contact",
          element: <MySuspense children={<Contact />} />,
        },
        {
          path: "auth/signin",
          element: <Auth />,
        },
        {
          path: "auth/signup",
          element: <Auth />,
        },
        {
          path: "profile",
          element: (
            <button onClick={signOutUser} className=" mt-40">
              Signout
            </button>
          ),
        },
      ],
    },
  ]);
}
