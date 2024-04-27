import { Suspense } from "react";
import Loader from "./Loader/Loader";

export default function MySuspense({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
