import { useEffect } from "react";
import Router from "./Router";
import Message from "./components/Message";

export default function App() {
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(
  //       "http://localhost:5001/e-commerce-7bd3f/us-central1/helloWorld"
  //     );
  //     console.log(res.text());
  //   })();
  // }, []);

  return (
    <>
      <Message />
      <Router />
    </>
  );
}
