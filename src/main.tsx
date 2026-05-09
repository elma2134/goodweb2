import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

/* Facebook SDK */
const fbScript = document.createElement("script");
fbScript.src =
  "https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v19.0";
fbScript.async = true;
fbScript.defer = true;
fbScript.crossOrigin = "anonymous";

document.body.appendChild(fbScript);

createRoot(document.getElementById("root")!).render(<App />);
