import { useUI } from "./hooks/UserProvider";
import { useEffect } from "react";

export default function App() {
  /** useEffect(() => {
    const payload = {
      uid: "6XTYJpGmCuULPq0v6YXF53Aadc12",
      condition: true,
    };
    const makeAdmin = async () => {
      const response = await fetch("https://us-central1-grain-du-sud.cloudfunctions.net/assignAdminRole", {
        method: "post",
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log({ response })
      }
    };
    makeAdmin();
  }); **/
  const UI = useUI();
  return UI;
}
