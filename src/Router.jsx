import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import { lazy } from "react";
import MySuspense from "./components/MySuspense";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProfileLayout from "./components/Profile/ProfileLayout";
import AccountInformation from "./components/Profile/AccountInformation";
import CartLayout from "./components/Cart/CartLayout";
import Addresses from "./components/Cart/Addresses";
import AddressForm from "./components/Forms/AddressFrom";
import Confirmation from "./components/Cart/Confirmation";
import End from "./components/Cart/End";
import ShippingAddresses from "./components/Profile/ShippingAddresses";
import MyOrders from "./components/Profile/MyOrders";
import Receipt from "./components/Receipt";
import Notifications from "./components/Profile/Notifications";

const Welcome = lazy(() => import("./pages/Welcome"));
const Services = lazy(() => import("./pages/Services"));
const OurNutrition = lazy(() => import("./pages/OurNutrition"));
const OurChicks = lazy(() => import("./pages/OurChicks"));
const OurChickens = lazy(() => import("./pages/OurChickens"));
const Contact = lazy(() => import("./pages/Contact"));
const Shop = lazy(() => import("./pages/Shop"));
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <MySuspense children={<Welcome />} />,
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
          path: "boutique",
          element: <MySuspense children={<Shop />} />,
        },
        {
          path: "boutique/:productId",
          element: <MySuspense children={<ProductDetails />} />,
        },
        {
          path: "/receipt",
          element: <Receipt />,
        },
        {
          path: "cart",
          element: <CartLayout />,
          children: [
            {
              index: true,
              element: <Cart />,
            },
            {
              path: "address",
              element: <Addresses />,
            },
            {
              path: "confirmation",
              element: <Confirmation />,
            },
            {
              path: "end",
              element: <End />,
            },
          ],
        },
        {
          path: "form/address-form",
          element: <AddressForm />,
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
          element: <ProfileLayout />,
          children: [
            {
              element: <AccountInformation />,
              index: true,
            },
            {
              path: "Mescommandes",
              element: <MyOrders />,
            },
            {
              path: "adressedelivraison",
              element: <ShippingAddresses />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
          ],
        },
      ],
    },
  ]);
}
