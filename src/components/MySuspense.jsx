import { Suspense } from "react";

export default function MySuspense({ children }) {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
}
