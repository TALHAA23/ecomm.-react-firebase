import { useEffect } from "react";
import Router from "./Router";
import Message from "./components/Message";

export default function App() {
  return (
    <>
      <Message />
      <Router />
    </>
  );
}
